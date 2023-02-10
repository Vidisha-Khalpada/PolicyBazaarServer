const mongoose=require("mongoose")
const navbarschema=new mongoose.Schema({
    "TermInsurance":[],
    "OtherInsurance":[],
    "InvestmentPlans":[],
    "HealthInsurance":[],
    "CarInsurance":[]
})

const NavbarModel=mongoose.model("navbar",navbarschema)

module.exports=NavbarModel