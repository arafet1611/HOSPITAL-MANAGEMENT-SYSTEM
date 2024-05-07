import mongoose from "mongoose";
const doctorSchema = new mongoose.Schema({
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
const Doctor = mongoose.model("Doctor", doctorSchema);
export default Doctor;
