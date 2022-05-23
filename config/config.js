require("dotenv").config()
const mongoose = require("mongoose")

const connectDB = ()=>{
    mongoose.connect(process.env.MONGO_URL)
    console.log("connected to database")
}


module.exports = connectDB
