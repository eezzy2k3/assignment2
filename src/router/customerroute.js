const  {registerCustomer,loginCustomer,updatecustomer,deletcustomer,changepassword,getone} = require("../controller/customercontroller")
const authorizeCust = require("../middlewares/authorizecus")
const express = require("express")
const router = express.Router()

router.post("/createcustomer",registerCustomer)
router.post("/logincustomer",loginCustomer)
router.put("/updatecustomer",authorizeCust,updatecustomer)
router.delete("/deletecustomer",authorizeCust,deletcustomer)
router.put("/changecustomerpassword",authorizeCust,changepassword)
router.get("/getonecustomer",authorizeCust,getone)








module.exports = router