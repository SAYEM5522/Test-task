const connection_url =
  "mongodb+srv://Demo:sayembd5522@cluster0.9atbosk.mongodb.net/?retryWrites=true&w=majority";
import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import mongoose from "mongoose"
const PORT=process.env.PORT||8081
const app=express()
app.use(cors())
app.use(bodyParser.json())

mongoose.connect(connection_url,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

mongoose.connection.once('open',()=>{
  console.log("Connected Successfully")
})

app.listen(PORT,()=>{
  console.log(`Server Started At PORT ${PORT}`)
})
