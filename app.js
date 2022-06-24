require("dotenv").config()
const express = require("express")
const { append } = require("express/lib/response")
const connectDb = require("./config/config")
const userrouter = require("./src/router/userrouter")
const productrouter = require("./src/router/productrouter")
const customerrouter = require("./src/router/customerroute")
const cartrouter = require("./src/router/cartrouter")

const app = express()
app.use(express.urlencoded({extended:false}))
app.use(express.json())

connectDb()


app.use("/api",userrouter)
app.use("/api",productrouter)
app.use("/api",customerrouter)
app.use("/api",cartrouter)







app.listen(5000,()=>{
    console.log("app is listening on port 5000....")
})