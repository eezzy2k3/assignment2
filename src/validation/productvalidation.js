const Joi = require('joi')

const validation = Joi.object({
            productName:Joi.string().required(),
            storeName:Joi.string().required(),
            price:Joi.number().required(),
            quantity:Joi.number().integer().required(),
            description:Joi.string().required(),
           
        })

        const productvalidation = async(req,res,next)=>{
            const payload = {
                productName:req.body.productName,
                storeName:req.body.storeName,
                price:req.body.price,
                quantity:req.body.quantity,
                description:req.body.description,
               
            }
           const{error} = validation.validate(payload)
                if(error){
                    res.status(406).json({success:false,msg:error})
                }else{
                    next()
                }
            
        }

        module.exports = productvalidation