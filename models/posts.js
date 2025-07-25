const mongoose = require("mongoose")

const postSchema = mongoose.Schema(

    {

        Userid: {

            type: mongoose.Schema.Types.ObjectId,
            ref:"users"
        },

        Message: String,
        Postdate: {
            type:Date,
            default:Date.now

        }



    }



)

var postModel=mongoose.model("posts",postSchema)
module.exports=postModel


