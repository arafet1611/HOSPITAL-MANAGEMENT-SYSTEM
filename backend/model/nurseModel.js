import mongoose from "mongoose";
const nurseSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
  },
  Type: {
    type: String,
  },
  categorie: {
    type: String,
  },
  responsabilite: {
    type: String,
  },
});
const Nurse = mongoose.model("Nurse", nurseSchema);
export default Nurse;
