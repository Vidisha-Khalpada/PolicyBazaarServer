const mongoose=require("mongoose")
const LoginSchema=new mongoose.Schema({
    name:String,
    email:String,
    password:String
})
 const LoginModel= mongoose.model("usersdata",LoginSchema)
module.exports=LoginModel