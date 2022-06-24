const {register,login,getall,getone,update,delet,generatedRefreshToken,changepassword} = require("../controller/usercontroller")
const uservalidation = require ("../validation/uservalidation")
const authorizeUser = require("../middlewares/authorize")
const express = require("express")
const router = express.Router()



router.post("/register",uservalidation,register)
router.post("/loginuser",login)
router.get("/getalluser",getall)
router.get("/getoneuser",authorizeUser,getone)
router.put("/updateuser/",authorizeUser,update)
router.delete("/deleteuser/",authorizeUser,delet)
router.get("/refreshtoken",generatedRefreshToken)
router.post("/changeuserpassword",authorizeUser,changepassword)




module.exports = router