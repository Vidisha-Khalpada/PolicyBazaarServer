const mongoose=require("mongoose")
const insuranceschema=new mongoose.Schema({
    insurer:Object,
    life_cover:String,
    cover_till_age: Object,
    premium: String,
      clim_settled: Number,
      offers: Array,
      userid:String
})

let UserInsuranceModel=mongoose.model("userinsurance",insuranceschema)

module.exports=UserInsuranceModel