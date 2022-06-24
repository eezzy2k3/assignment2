const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({
    owner:{type:mongoose.Schema.Types.ObjectId,ref:"Customer" },
    products:[
        {productid:{type:mongoose.Schema.Types.ObjectId,ref:"Product"},
        productName:{
            type:String,
            required:true,
            trim:true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1,
            default: 1},
            price:Number
    }
    ],
    bill: {
        type: Number,
        required: true,
       default: 0
      }
    }, {
    timestamps: true
    })

    const Cart = new mongoose.model("Cart",cartSchema)

    module.exports = Cart
