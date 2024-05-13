import mongoose from "mongoose";

const secretairySchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
  },
  responsabilite: {
    type: String,
  },
});
const Secretairy = mongoose.model("Secretairy", secretairySchema);
export default Secretairy;
