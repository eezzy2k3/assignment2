const {getcart,createcart,removeproduct,emptyCart} = require("../controller/cartcontroller")
const authorizeCust = require("../middlewares/authorizecus")
const express = require("express")
const router = express.Router()


router.get("/getcart",authorizeCust,getcart)
router.post("/createcart",authorizeCust,createcart)
router.delete("/removeproduct/:productid",authorizeCust,removeproduct)
router.delete("/emptycart",authorizeCust,emptyCart)


module.exports = router