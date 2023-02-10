const bcrypt=require("bcrypt")
const express=require("express")
const LoginModel = require("../Models/Login")
const app=express()
const axios=require("axios")
const jwt=require("jsonwebtoken")
const env=require("dotenv")
env.config({
    path:".env"
})

const loginrouter=express.Router()
const secret=process.env.SECRET
loginrouter.post("/api/otpregister",async(req,res)=>
{
    var options = {
        method: 'POST',
        url: 'https://dev-j7n3jcx7tokypy37.us.auth0.com/oauth/token',
        headers: {'content-type': 'application/x-www-form-urlencoded'},
        data: new URLSearchParams({
          grant_type: 'password',
          username: 'vidishakhalpada@gmail.com',
          password: 'vidu@1811',
          client_id: 'EinY2CwBXlj10UieEiVaLI6BW4q5hy3B',
          client_secret: '65fwgn2OWsQDb6d1K9cc4LU7UtoGAQJPqIJ7z9tZqEJfyoz-BKKauNG0hJUiK2_B',
          audience: 'https://someapi.com/api',
          scope: 'openid profile read:sample'
        })
      };
      
      axios.request(options).then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        console.error(error);
      });
})

loginrouter.post("/api/register",async(req,res)=>
{
    try {
        let data= req.body
        let existinguser=await LoginModel.find({name:data.name})
        if(existinguser.length>0)
        {
            return res.send({message:"The user has already registered.. Please login to continue.."})
        }
        bcrypt.hash(data.password,10,async(err,hash)=>
        {
            console.log(hash)
            existinguser=await LoginModel.create({
                name:data.name,
                email:data.email,
                password:hash
            })
            res.send({
                message:"Successfull SignUp"
            })
        })
    } catch (error) {
        return res.status(400).send({
           message: error
        })
    }
})

loginrouter.post("/api/login",async(req,res)=>
{
    try {
        const data=req.body
        let usersdata=await LoginModel.find({email:data.email})
        if(usersdata.length>0)
        {
            bcrypt.compare(data.password,usersdata[0].password, function(err,result)
            {
                if(result)
                {
                    let{name,email,_id}=usersdata[0]
                    const token=jwt.sign({name,email,_id},secret)
                    return res.send({
                        token:token,
                        name:name,
                        message:"The user has successfully loggedin"
                    })
                }
                else
                {
                    return res.status(400).send("Incorrect password")
                }
            })
        }
        else
        {
            return res.status(400).send("The user has not registered")
        }
    } catch (error) {
        
    }
})

module.exports=loginrouter
