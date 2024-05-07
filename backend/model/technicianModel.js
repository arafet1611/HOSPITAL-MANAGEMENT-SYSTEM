import mongoose from "mongoose";
const technicianSchema = new mongoose.Schema({
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
const Technician = mongoose.model("Technician", technicianSchema);
export default Technician;
