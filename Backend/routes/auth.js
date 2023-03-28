const express =require('express');
const router =express.Router()
const {body, validationResult }=require('express-validator')
const User =require('../models/User')
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var ftechuser =require("../middleware/ftechuser")
//  ROUTE 1 :create a User using :POST "api/auth/createuser" .no login required
const JWT_SECRET ="arbuisagoodboy"
router.post('/createuser',[
  body('name').isLength({min:3}),
  body('email').isEmail(),
  body('password').isLength({min:5})
],async(req,res)=>{
  //if there is an error return bad request and the errors
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try{
    //check the user with this email exists or not
   let check = await User.findOne({email:req.body.email})
   if(check){
     return res.status(400).json({error:"sorry a user with the email already exists"})
   }
   var salt = bcrypt.genSaltSync(10);
   var hash = bcrypt.hashSync(req.body.password, salt);
   const user = await User.create({
      name:req.body.name,
      password:hash,
      email:req.body.email,
    })
    const data={
     user:{
      id:user.id
     }
    }
    var authtoken =jwt.sign(data,JWT_SECRET);
    console.log(authtoken)
    res.send(user)
  }catch (error){
    console.error(error.message)
    res.status(500).send("some error occured")
  }
    //.then(user=>res.json(user))
    // .catch(err=>{
    //   console.log(err)
    //   res.json({error:`${err}`})
    // })
})
// Route 2 :login a User using :POST "api/auth/loginuser" .no login required
router.post('/loginuser',[

  body('email').isEmail(),
  body('password',"password can not be blank").exists()
],async(req,res)=>{

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {email ,password} =req.body
  try {
    const user = await User.findOne({email:email})
    if(!user){
      return res.status(400).json({error:"wrong creditantials"})
    }
    const passwordCompare = await bcrypt.compare(password,user.password)
    if(!passwordCompare){
      return res.status(400).json({error:"wrong creditantials"})
    }
    const data={
      user:{
        id:user.id
      }
    }
    var authtoken =jwt.sign(data,JWT_SECRET);
    res.json({authtoken:authtoken})
  } catch (error) {
    console.error(error.message)
    res.status(500).send("some error occured")
  }
})

// Route 3:get logged in user details :POST api/auth/getuser" LOGIn REQUIRED
router.post('/getuser',ftechuser,async(req,res)=>{
    
  try {
    const userID =req.user.id
    const user=await User.findById(userID).select("-password")
    res.json(user);
    
  } catch (error) {
    console.error(error.message)
    res.status(500).send("some error occured")
  }
})

module.exports =router