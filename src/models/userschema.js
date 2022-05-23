const mongoose = require("mongoose")
const {Product,productSchema} = require("./productschema")

const userSchema = new mongoose.Schema({
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
    storeName:{
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
    product:productSchema
},{timestamps:true})


const User = new mongoose.model("User",userSchema)

// const validateUser =(User)=>{
//    
//         return schema.validate(User)    
// }


module.exports = User
