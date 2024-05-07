import mongoose from "mongoose";
const workerSchema = new mongoose.Schema({
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
const Worker = mongoose.model("Worker", workerSchema);
export default Worker;
