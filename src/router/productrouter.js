const {createProduct,getall,getone,update,delet,getalluserproduct, uploadImage} = require("../controller/productcontroller")
const productvalidation = require("../validation/productvalidation")
const updateproductvalidation = require("../validation/updateproduct")
const authorizeUser = require("../middlewares/authorize")
const upload = require("../utils/upload")
const express = require("express")
const router = express.Router()



router.post("/createproduct",authorizeUser,productvalidation,createProduct)
router.get("/getallproduct",getall)
router.get("/getoneproduct/:id",authorizeUser,getone)
router.put("/updateproduct/:id",authorizeUser,updateproductvalidation,update)
router.delete("/deleteproduct/:id",authorizeUser,delet)
router.get("/getalluserproduct",authorizeUser,getalluserproduct)
router.post('/uploadimage/:id', authorizeUser,upload.single('productImage'), uploadImage)
module.exports = router
