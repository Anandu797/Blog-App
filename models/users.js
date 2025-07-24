const mongoose=require("mongoose")


const userSchema=mongoose.Schema(

{

    name:String,
    phone:String,
    email:String,
    password:String

}

)


var userModel=mongoose.model("users",userSchema)
module.exports=userModel