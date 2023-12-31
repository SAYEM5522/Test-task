import express from "express"
import { createForm, createSectors, getAllForms, getSectors, updateForm } from "../controller/Form.js"
const FormRouter=express.Router()
FormRouter.get("/",(req,res,next)=>{
  res.send("hello")
})
FormRouter.post("/createsectors",createSectors)
FormRouter.post("/createform",createForm)
FormRouter.get("/getsectors",getSectors)
FormRouter.get("/getAllForms",getAllForms)
FormRouter.post("/updateForm/:id",updateForm)


export {FormRouter}
