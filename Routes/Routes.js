const express=require("express")
const authenticate = require("../Middleware/authentication")
const InsuranceModel = require("../Models/Insurance")
const NavbarModel = require("../Models/Navbar")
const UserInsuranceModel = require("../Models/UserInsurance")

const router=express.Router()
router.get("/navbar",async(req,res)=>
{
    try {
        let data=await NavbarModel.find()
        res.send({
            data:data
        })
    } catch (error) {
        res.status(400).send({
            message:error
        })
    }
})
router.post("/navbar",async(req,res)=>
{
    try {
        let data=await NavbarModel.create(req.body)
        res.send({
            data:data
        })
    } catch (error) {
        res.status(400).send(error)
    }
})
router.post("/insurance",async(req,res)=>
{
    try {
        let data=await InsuranceModel.create(req.body)
        res.send({
            data:data
        })
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get("/allinsurance",async(req,res)=>
{
    try {
        let data=await InsuranceModel.find({})
        res.send({
            data:data
        })
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post("/addinsurance",authenticate,async(req,res)=>
{
    try {
        await UserInsuranceModel.create(req.body)
        res.send({
            "message":"The data is successfully added."
        })
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get("/individualinsurance",authenticate,async(req,res)=>
{
    try {
        let userres=await UserInsuranceModel.find({userid:req.body.userid})
        return res.send({
            data:userres
        })
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports=router