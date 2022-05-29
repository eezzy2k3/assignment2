const Joi = require('joi')

const validation = Joi.object({
            firstName:Joi.string().required(),
            lastName:Joi.string().required(),
            email:Joi.string().email().required(),
            storeName:Joi.string().required(),
            phoneNumber:Joi.number().integer().required(),
            password:Joi.string().min(6).required(),
        })

        const uservalidation = async(req,res,next)=>{
            const payload = {
                firstName:req.body.firstName,
                lastName:req.body.lastName,
                email:req.body.email,
                storeName:req.body.storeName,
                phoneNumber:req.body.phoneNumber,
                password:req.body.password
            
            }
           const{error} = validation.validate(payload)
                if(error){
                    res.status(406).json({success:false,msg:error.details[0].message})
                }else{
                    next()
                }
            
        }

        module.exports = uservalidation