const express=require("express")
const ensureAuthenticated = require("../Middleware/Auth")

const productrouter=express.Router()

productrouter.get("/",ensureAuthenticated,(req,res)=>{
    console.log("------Logged user----",req.user)
    res.status(200).json([
        {
            name:"mobile",
            price:1000
        },
        {
            name:"tv",
            price:2000
        }
    ])

})

module.exports=productrouter