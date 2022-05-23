const User = require("../models/userschema")
const {Product} = require("../models/productschema")
const jwt = require("jsonwebtoken")

const createProduct = async(req,res)=>{
    try{
        const {productName,storeName,price,quantity,description} = req.body
        // hardcoded the token
        const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOGJkM2ExMWNlZjJlNzdjMzlhYTI4MSIsImVtYWlsIjoiNzdAeWFob28uY29tIiwiaWF0IjoxNjUzMzMwOTE0fQ.1pJgOlZCODePuSMJH0o3UIwBiFLWamS0QQ7vJ5VPDQI"
        const decode = jwt.verify(token,process.env.SECRET)
        if(!decode) return res.status(400).json({success:false,msg:"user should log in"})
        const newproduct = await new Product({productName,storeName,price,quantity,description})
        await newproduct.save()
          User.findOneAndUpdate({email:decode.email},{product:newproduct},{new:true},(err,userProduct)=>{
            if(userProduct) {
                 res.status(200).json({suucess:true,msg:"product succesfully created",data:userProduct})
            } else(
                res.status(404).json({success:false,msg:err})
            )
        })
    }catch(err){
        res.status(404).json({success:false,msg:err})
    }
   
    
    
   
}

const getall = async(req,res)=>{
    try{
        Product.find((err,foundall)=>{
            if(foundall){
               return res.status(200).json({success:true,numberOfProducts:foundall.length,data:foundall})
            }
        })
        

    }catch(error){
        return res.status(404).json({success:false,msg:error})
    }
}

const getone = async(req,res)=>{
    try{
        const id = req.params.id
         Product.findOne({_id:id},(err,foundone)=>{
             if(foundone){
                return res.status(200).json({success:true,data:foundone})
             }else{
                 res.status(404).json({suucess:false,msg:err})
             }
         })
     }catch(error){
        res.status(404).json({success:false,msg:error})
    }
}

const update = async(req,res)=>{
    try{
        const id = req.params.id
         Product.findOneAndUpdate({_id:id},req.body,{new:true},(err,updatedItem)=>{
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
    const id = req.params.id
    Product.findOneAndDelete({_id:id},(err)=>{
        if(!err){
            res.status(200).json({success:true,msg:"product successfully deleted"})
        }else{
            res.status(404).json({success:false,msg:err})
        }
    })
}


module.exports ={createProduct,getall,getone,update,delet} 





