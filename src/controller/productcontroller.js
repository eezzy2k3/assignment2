const User = require("../models/userschema")
const {Product} = require("../models/productschema")
const jwt = require("jsonwebtoken")


const createProduct = async(req,res)=>{
    try{
        const {productName,storeName,price,quantity,description} = req.body
        const {id} = req.user

        const newproduct = await new Product({productName,storeName,price,quantity,description,userid:id})
        await newproduct.save()
        res.status(200).json({suucess:true,msg:"Product successfull created",data:newproduct})
    }catch(err){
        res.status(404).json({success:false,msg:err})
    }
}

const getall = async(req,res)=>{
    try{
        const foundall = await Product.find({}).populate({path:"userid",select:["storeName","email"]})
        if(!foundall) return res.status(404).json({success:false,msg:"no product found"})
               return res.status(200).json({success:true,numberOfProducts:foundall.length,data:foundall})
           

        }catch(error){
        return res.status(404).json({success:false,msg:error})
    }
}

const getone = async(req,res)=>{
    try{
        const pid = req.params.id
        const id = req.user.id
        const findOne = await Product.findOne({userid:id,_id:pid}).populate({path:"userid",select:["storeName","email"]})
        if(!findOne) return res.status(404).json({success:false,msg:"no product found"})
            return res.status(200).json({success:true,data:findOne})
             
     }catch(error){
        res.status(404).json({success:false,msg:error})
    }
}

const getalluserproduct = async(req,res)=>{
    try{
        const {id} = req.user
        const found = await Product.find({userid:id}).populate({path:"userid",select:["storeName","email"]})
        if(!found) return res.status(404).json({success:false,msg:"no product found"})
        return res.status(200).json({success:true,numberOfproduct:found.length,data:found})
    }catch(err){
        return res.status(404).json({success:false,msg:error})
    }
}

const update = async(req,res)=>{
    try{
        const pid = req.params.id
        const id = req.user.id
         Product.findOneAndUpdate({userid:id,_id:pid},req.body,{new:true},(err,updatedItem)=>{
             if(updatedItem){
                 res.status(200).json({success:true,msg:"successfuly updated",data:updatedItem})
             }else{
                 res.status(404).json({success:false,msg:err})
             }
         })

    }catch(error){
        res.status(404).json({success:false,msg:error})
    }

}

const delet = async(req,res)=>{
    try{
        const pid = req.params.id
        const id = req.user.id
    Product.findOneAndDelete({userid:id,_id:pid},(err,deleted)=>{
        if(deleted){
            res.status(200).json({success:true,msg:"product successfully deleted"})
        }else{
            res.status(404).json({success:false,msg:err})
        }
    })
    }catch(error){
        res.status(404).json({success:false,msg:error})
    }
}


module.exports ={createProduct,getall,getone,update,delet,getalluserproduct} 





