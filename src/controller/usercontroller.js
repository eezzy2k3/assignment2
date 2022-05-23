const User = require("../models/userschema")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const Joi = require('joi')



const register = async(req,res)=>{
    try{
        let {firstName,lastName,email,storeName,phoneNumber,password} = req.body
        
    const user = await User.findOne({email})
    if(user){
        return res.status(404).json({
            success:false,
            msg:"user already exist"
        })
    }
     let hashedPassword = await bcrypt.hash(password,12)
     password = hashedPassword
     const newuser = await new User({firstName,lastName,email,storeName,phoneNumber,password})
        await newuser.save()
        res.status(200).json({
            success:true,
            msg:"you have succesfully created a user account",
            data:newuser
        })
    }catch(err){
        console.log(err)
       return res.status(404).json({
            success:false,
            msg:err
        })
    }
    
}

const login =async(req,res)=>{
    const {email,password} = req.body
    const user = await User.findOne({email})
    if(!user)  return res.status(404).json({success:false,msg:"user does not exist"})
    const validpassword =await bcrypt.compare(password,user.password)
    if(!validpassword) return res.status(404).json({success:false,msg:"wrong username or password"})
    const token = await jwt.sign({id:user._id,email:user.email},process.env.SECRET)
    res.status(200).json({
        success:true,
        msg:"user logged in",
        token

    })

}

const getall = async(req,res)=>{
    try{
        User.find((err,foundall)=>{
            if(foundall){
               return res.status(200).json({success:true,totalUsers:foundall.length,data:foundall})
            }
        })
        

    }catch(error){
        return res.status(404).json({success:false,msg:error})
    }
}

const getone = async(req,res)=>{
    try{
        const id = req.params.id
         User.findOne({_id:id},(err,foundone)=>{
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
         User.findOneAndUpdate({_id:id},req.body,{new:true},(err,updatedItem)=>{
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
    User.findOneAndDelete({_id:id},(err)=>{
        if(!err){
            res.status(200).json({success:true,msg:"product successfully deleted"})
        }else{
            res.status(404).json({success:false,msg:err})
        }
    })
}

module.exports = {register,login,getall,getone,update,delet}