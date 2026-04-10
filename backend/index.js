require("dotenv").config()
const express=require("express")
const app=express()
const mongodb=require("./db/db")
const bodyparser=require("body-parser")
const cors=require("cors")
const router=require("./routes/auth.routes")
const productrouter = require("./routes/productsRouter")
const port=process.env.PORT

// middlewars
app.use(express.json());
app.use(bodyparser.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.send("hi home page")
})


app.use("/api",router)
app.use("/products",productrouter)






app.listen(port,()=>{
    mongodb()
    console.log("server is running at port no 3000")
})