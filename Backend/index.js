const connectToMongo = require("./db");
const express = require('express')
connectToMongo();
const cors = require("cors");


const app = express()
const port = 5000
app.use(cors());
app.use(express.json())
//Available routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })
// app.get('/v1/signup',(req,res)=>{
//   res.send("signup page")
// })
// app.get('/v1/login',(req,res)=>{
//   res.send("login page")
// })
app.listen(port, () => {
  console.log(`EverNote Backend  listening on port ${port}`)
})