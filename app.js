const express = require("express")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const cors = require("cors")
const jwt = require("jsonwebtoken")
const userModel = require("./models/users")
const postModel = require("./models/posts")

let app = express()

app.use(express.json())
app.use(cors())
mongoose.connect("mongodb+srv://Anandu2001:Anandu2206@cluster0.xxwybre.mongodb.net/blogAppDb?retryWrites=true&w=majority&appName=Cluster0")



// *****Creating post api*****

app.post("/addpost",(req,res)=>{

    let input=req.body


    // token needs to be passed to perform actions after sign in   ----- also need to validate the token


    let token=req.headers.token //token passed

    // verify the token

    jwt.verify(token,"blog-app",(error,decoded)=>{

        if (decoded) {
            
            let result=new postModel(input)
            result.save()
            res.json({"status":"succesfull"})


        } else {

            res.json({"status":"invalid authentication"})
            
        }


    })




})


// ***view all posts api*****

app.post("/viewall",(req,res)=>{
    let token=req.headers.token
    jwt.verify(token,"blog-app",(error,decoded)=>{

        if (decoded) {
            

             postModel.find().then((items)=>{

                res.json(items)


             }).catch()


        } else {


            res.json({"status":"invalid authentication"})



        }


    })
   


})



// ****view my post api****

app.post("/myposts",(req,res)=>{
    let input=req.body
    let token=req.headers.token
    jwt.verify(token,"blog-app",(error,decoded)=>{

        if (decoded) {
            

             postModel.find(input).then((items)=>{

                res.json(items)


             }).catch((error)=>{
                res.json({"status":"user doesnt exist"})
             })


        } else {


            res.json({"status":"invalid authentication"})



        }


    })
   


})







// *****SIGN IN API*****

app.post("/signin", (req, res) => {

    let input = req.body
    userModel.find({ email: req.body.email }).then(
        (items) => {


            if (items.length > 0) {


                const passwordvalidator = bcrypt.compareSync(req.body.password, items[0].password)

                if (passwordvalidator) {


                    jwt.sign({ email: req.body.email }, "blog-app", { expiresIn: "1d" }, (error, token) => {

                        if (error) {


                            res.json({ "status": "error" })


                        } else {

                            res.json({ "status": "success", "token": token, "userid": items[0]._id })


                        }


                    })

                } else {

                    res.json({ "status": "invalid password" })

                }


            } else {
                res.json({ "status": "invalid email" })
            }

        }

    ).catch()


})









// *****SIGNUP API*****
app.post("/signup", (req, res) => {

    //recieving input
    let input = req.body


    //hashing password
    let hashed = bcrypt.hashSync(req.body.password, 10)
    console.log(hashed)
    req.body.password = hashed
    console.log(input)



    // checking if email already exists
    userModel.find({ email: req.body.email }).then(
        (items) => {
            console.log(items)

            if (items.length > 0) { //array length 0 means email doesnt exist

                res.json({ "status": "email already exists" })

            } else {

                let final = new userModel(input)
                final.save()
                res.json({ "status": "success" })

            }



        }


    ).catch(

        (error) => { }

    ) //this returns an array





    // 
}

)



// *****SIGNIN API*****

app.listen(4000, () => {
    console.log("server is running")
})