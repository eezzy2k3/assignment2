const mongoose = require("mongoose")


const customerSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true
    },
    lastName:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
   
    phoneNumber:{
        type:Number,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    deliveryaddress:{
        type:String,
        required:true,
        trim:true
    },
    refreshtoken:{
        type:String
    },
    
},{timestamps:true})


const Customer = new mongoose.model("Customer",customerSchema)



module.exports = Customer
