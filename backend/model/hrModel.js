import mongoose from "mongoose";

const hrSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
  },
  responsabilite: {
    type: String,
  },
});
const Hr = mongoose.model("Hr", hrSchema);
export default Hr;
