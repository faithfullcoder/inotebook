const express = require("express");
const router = express.Router();
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");
var ftechuser = require("../middleware/ftechuser");
//Route1 get all the notes  GET "api/notes/ftechallnotes" fteching notes of someone
router.get("/ftechallnotes", ftechuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("some error occured");
  }
});
//Route2  creating a note by a user post api/notes/createnote
router.post(
  "/createnote",
  ftechuser,
  [
    body("title").isLength({ min: 3 }),
    body("description").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array });
      }
      const user = req.user;
      const note = await Notes.create({
        user: user.id,
        title: req.body.title,
        description: req.body.description,
      });
      note.save();
      res.status(200).json(note);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("some error occured");
    }
  }
);
//Rpute 3 Update a note of   put "user api/notes/updatenote/id"
router.put("/updatenote/:id", ftechuser, async (req, res) => {
  const { title, description, tag } = req.body;
  let note = await Notes.findById(req.params.id);
  if (!note) {
    return res.status(404).send("not exist");
  }
  if (note.user.toString() !== req.user.id) {
    return res.status(401).send("Not Allowed");
  }
  const newnote = {};
  if (title) {
    newnote.title = title;
  }
  if (description) {
    newnote.description = description;
  }
  if (tag) {
    newnote.tag = tag;
  }
  note = await Notes.findByIdAndUpdate(req.params.id, { $set: newnote },{new:true});
  return res.json(note)
});
//route 4 for deleting a note  "api/notes/deletenote/id"
router.delete("/deletenote/:id",ftechuser,async(req,res)=>{
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("not exist");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
     note =  await Notes.findByIdAndDelete(req.params.id)
     return res.send("note deleted sucessfully")
})
module.exports = router;
