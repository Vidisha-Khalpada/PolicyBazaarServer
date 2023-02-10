const mongoose=require("mongoose")
const insuranceschema=new mongoose.Schema({
    insurer:Object,
    life_cover:String,
    cover_till_age: Object,
    premium: String,
      clim_settled: Number,
      offers: Array
})

let InsuranceModel=mongoose.model("InsurancePolicies",insuranceschema)

module.exports=InsuranceModel