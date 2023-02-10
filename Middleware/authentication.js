const jwt=require("jsonwebtoken")
const env=require("dotenv")
env.config({
    path:".env"
})
let jwtsecret=process.env.SECRET
const authenticate=(req,res,next)=>
{
    const token=req.headers?.authorization?.split(" ").pop()
    if(token)
    {
        const decoded=jwt.verify(token,jwtsecret)
        if(decoded)
        {
            let userid=decoded._id
            req.body.userid=userid
            next()
        }
        else
        {
            return res.send("Please login")
        }
    }
    else
    {
        return res.send("Please login")
    }
}

module.exports=authenticate