const {register,login,getall,getone,update,delet} = require("../controller/usercontroller")
const uservalidation = require ("../validation/uservalidation")
const express = require("express")
const router = express.Router()



router.post("/register",uservalidation,register)
router.post("/login",login)
router.get("/getalluser",getall)
router.get("/getoneuser/:id",getone)
router.put("/updateuser/:id",update)
router.delete("/deleteuser/:id",delet)



module.exports = router