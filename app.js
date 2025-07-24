const express=require("express")
const mongoose=require("mongoose")
const bcrypt=require("bcrypt")
const cors=require("cors")
const jwt=require("jsonwebtoken")
const userModel=require("./models/users")

let app=express()

app.use(express.json())
app.use(cors())
mongoose.connect("mongodb+srv://Anandu2001:Anandu2206@cluster0.xxwybre.mongodb.net/blogAppDb?retryWrites=true&w=majority&appName=Cluster0")

app.post("/signup",(req,res)=>{

    //recieving input
    let input=req.body 


    //hashing password
    let hashed=bcrypt.hashSync(req.body.password,10)
    console.log(hashed)
    req.body.password=hashed
    console.log(input)
    


    // checking if email already exists
    userModel.find({email:req.body.email}).then(
    (items)=>{
        console.log(items)

                if (items.length>0) { //array length 0 means email doesnt exist
            
            res.json({"status":"email already exists"})

        } else {
            
            let final=new userModel(input)
             final.save()
            res.json({"status":"success"})

        }



    }


   ).catch(

    (error)=>{}

   ) //this returns an array
   


    

// 
}

)

app.listen(4000,()=>{
    console.log("server is running")
})