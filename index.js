const express=require("express")
const Connection = require("./Config/Connection")
const router = require("./Routes/Routes")
const loginrouter=require("./Routes/LoginRoutes")
const cors=require("cors")

const app=express()
app.use(express.json())
app.use(cors())
app.use("/",router)
app.use("/",loginrouter)
app.listen(4000,()=>
{
    try {
        Connection()
        console.log("Server is listening at port 4000")
    } catch (error) {
        console.log(error)
    }
})