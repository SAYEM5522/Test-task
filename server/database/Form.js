import mongoose from "mongoose";

const FormSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  sectors:[{
    type:String
  }],
  terms:{
    type:Boolean
  }
});
const Form = mongoose.model("FormSchema", FormSchema);
export { Form };
