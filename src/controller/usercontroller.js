const User = require("../models/userschema")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")




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
    try{
        const {email,password} = req.body
        const user = await User.findOne({email})
        if(!user)  return res.status(404).json({success:false,msg:"user does not exist"})
        const validpassword =await bcrypt.compare(password,user.password)
        if(!validpassword) return res.status(404).json({success:false,msg:"wrong username or password"})
        const accesstoken = await jwt.sign({id:user._id,email:user.email},process.env.SECRET,{expiresIn:"40d"})
        const refreshtoken = await jwt.sign({id:user._id,email:user.email},process.env.REFRESH_TOKEN,{expiresIn:"40d"})
        user.refrsehtoken = refreshtoken
        await user.save()
        res.status(200).json({
            success:true,
            msg:"user logged in",
           accesstoken:accesstoken,
           refreshtoken:refreshtoken
    
        })
    }catch(err){
        res.status(401).json({success:false,msg:err})
    }
   

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
        const id = req.user.id
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
        const id = req.user.id
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
    const id = req.user.id
    User.findOneAndDelete({_id:id},(err,deleted)=>{
        if(deleted){
            res.status(200).json({success:true,msg:"user successfully deleted"})
        }else{
            res.status(404).json({success:false,msg:err})
        }
    })
}

const generatedRefreshToken = async(req,res)=>{
    const token = req.headers.refresh_token
    console.log(token)
    const user = await User.find({refreshtoken:token})
    if(!user) return res.status(404).json({success:false,msg:"user not found"})
    const accesstoken = await jwt.sign({id:user._id,email:user.email},process.env.SECRET,{expiresIn:"40s"})
    res.status(200).json({success:true,msg:"user successfully loggrd in",token:accesstoken})
    
}

const changepassword = async(req,res)=>{
    try{
        id = req.user.id
        const password = req.body.password
        let newpassword = req.body.newpassword
        const user = await User.findOne({_id:id})
        const validpassword =await bcrypt.compare(password,user.password)
        if(!validpassword) return res.status(404).json({success:false,msg:"wrong username or password"})
            let hashedPassword = await bcrypt.hash(newpassword,12)
            newpassword = hashedPassword
            User.findOneAndUpdate({_id:id},{password:newpassword},{new:true},(err,updatedItem)=>{
                if(updatedItem){
                   return res.status(200).json({success:true,msg:"successfuly changed password",data:updatedItem})
                }else{
                   return res.status(404).json({success:false,msg:err})
                }
            })
    }catch(err){
        res.status(404).json({success:false,msg:err})
    }
}

module.exports = {register,login,getall,getone,update,delet,generatedRefreshToken,changepassword}