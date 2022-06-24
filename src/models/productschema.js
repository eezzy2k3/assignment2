const mongoose = require("mongoose")


const productSchema = new mongoose.Schema({
    productName:{
        type:String,
        required:true,
        trim:true
    },
    storeName:{
        type:String,
        required:true,
        trim:true
    },
    price:{
        type:Number,
        required:true,
        trim:true
    },
    quantity:{
        type:Number,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    productImage:{
        type:String
    },
    userid:[{type:mongoose.Schema.Types.ObjectId,ref:"User"}],

},{timestamps:true})




const Product = new mongoose.model("Product",productSchema)

module.exports = {Product,productSchema}
