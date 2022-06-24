const Cart = require("../models/cartschema")
const { Product } = require("../models/productschema")

const getcart = async(req,res)=>{
    try{
        const owner = req.user.id
        const findcart = await Cart.findOne({owner:owner}).populate({path:"owner",select:["email","id","firstName"]})
        if(findcart && findcart.products.length > 0){
            res.status(200).json({
                success:true,
                data:findcart
            })
        }else{
            res.status(404).json({success:false,msg:"no product found"})
        }
    }catch(error){
        res.status(404).json({success:false,msg:error})
    }
   
}

const createcart = async(req,res)=>{
    try{
        const quantity = req.body.quantity
        const productid = req.body.productid
        const owner = req.user.id
        

        const findcart = await Cart.findOne({owner}).populate({path:"owner",select:["email","id","firstName"]})
        const findproduct = await Product.findOne({_id:productid})
        if(!findproduct) return res.status(400).json({success:false,message:"product not found"})
        const productName = findproduct.productName
        const price = findproduct.price
        if(findcart){
            const productIndex = findcart.products.findIndex((findproduct)=>findproduct.productid == productid )
            if(productIndex>-1){
                let product = findcart.products[productIndex]
                product.quantity = quantity
            findcart.bill = findcart.products.reduce((acc, curr) => {
                    return acc + curr.quantity * curr.price
                },0)
                findcart.products[productIndex] = product
                await findcart.save()
                res.status(200).json({
                    success:true,
                    data:findcart
                })
            }else{
                findcart.products.push({quantity,price,productid,productName})
                findcart.bill = findcart.products.reduce((acc, curr) => {
                    return acc + curr.quantity * curr.price
                 },0)
                    await findcart.save()
                    res.status(200).json({
                        success:true,
                        data:findcart
                    })
            }

        }else {
            //no cart exists, create one
            const newCart = await Cart.create({
               owner,
               products: [{ quantity,price,productid,productName }],
                bill: quantity * price,
            })
            await newCart.save()
            
            res.status(200).json({
                success:true,
                data:newCart
            })
            }
    }catch(error){
        res.status(404).json({success:false,msg:error})
    }
}

const removeproduct = async(req,res)=>{
    try{
        const owner = req.user.id
        const productid = req.params.productid
        const findcart = await Cart.findOne({owner:owner})
        const productIndex = findcart.products.findIndex((findproduct)=>findproduct.productid == productid )
        if(productIndex > -1){
         let product = findcart.products[productIndex]
         findcart.bill = product.quantity * product.price
         if(findcart.bill < 0){
             findcart.bill = 0
         }
         findcart.products.splice(productIndex,1)
         findcart.bill = findcart.products.reduce((acc, curr) => {
            return acc + curr.quantity * curr.price;
            },0)
            await findcart.save()
            res.status(200).json({success:true,data:findcart})
        
        }else{
            res.status(400).json({success:false,message:"product not found"})
        }
    }catch(err){
        res.status(404).json({success:false,msg:err})
    }
   

}

// empty cart
const emptyCart = async(req,res)=>{
    const owner = req.user.id
    let findcart = await Cart.findOne({owner})
    if(findcart.products.length<1) return res.status(401).json({success:false,message:"no products in the cart"})
    findcart.products = []
    findcart.bill = findcart.products.reduce((acc,curr)=>{
        return acc + curr.quantity*curr.price
    },0)
    await findcart.save()
    res.status(200).json({success:true,message:"successfully emptied cart",data:findcart})
    

}

module.exports = {getcart,createcart,removeproduct,emptyCart}