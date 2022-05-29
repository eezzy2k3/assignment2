const Joi = require('joi')

const validation = Joi.object({
            productName:Joi.string(),
            storeName:Joi.string(),
            price:Joi.number(),
            quantity:Joi.number().integer(),
            description:Joi.string(),
           
        })

        const updateproductvalidation = async(req,res,next)=>{
            const payload = {
                productName:req.body.productName,
                storeName:req.body.storeName,
                price:req.body.price,
                quantity:req.body.quantity,
                description:req.body.description,
               
            }
           const{error} = validation.validate(payload)
                if(error){
                    res.status(406).json({success:false,msg:error.details[0].message})
                }else{
                    next()
                }
            
        }

        module.exports = updateproductvalidation