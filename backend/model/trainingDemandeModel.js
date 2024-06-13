import mongoose from "mongoose";

const trainingDemandeSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
  },
  documentType: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
    required: true,
  },
  attachedFile: {
    type: String,
  },
  demandeStatus: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
  reason: {
    type: String,
    default: "No reason provided",
  },
});

const TrainingDemande = mongoose.model(
  "TrainingDemande",
  trainingDemandeSchema
);

export default TrainingDemande;
