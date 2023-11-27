import mongoose from "mongoose";

const SectorsSchema = new mongoose.Schema({
  sectors:[{
    type:String
  }]
});
const Sectors = mongoose.model("SectorsSchema", SectorsSchema);
export { Sectors };
