const express = require("express")
const path = require("path")
const app = express()

const port = process.env.PORT || 4200;

app.use(express.static(path.join(__dirname,"dist","Dentist-Web-Manager-Client")))

app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"dist","Dentist-Web-Manager-Client","index.html"))
})

app.listen(port, ()=>{
    console.log('------------------------------------');
    console.log("Running form server.js");
    console.log('------------------------------------');
})