const {createProduct,getall,getone,update,delet} = require("../controller/productcontroller")
const productvalidation = require("../validation/productvalidation")
const express = require("express")
const router = express.Router()



router.post("/create",productvalidation,createProduct)
router.get("/getproduct",getall)
router.get("/getone/:id",getone)
router.put("/update/:id",update)
router.delete("/delete/:id",delet)

module.exports = router
