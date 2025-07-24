const express=require("express")
const mongoose=require("mongoose")
const bcrypt=require("bcrypt")
const cors=require("cors")
const jwt=require("jsonwebtoken")

let app=express()

app.get("/",(req,res)=>{

    res.json({"status":"ok"})

})

app.listen(4000,()=>{
    console.log("server is running")
})