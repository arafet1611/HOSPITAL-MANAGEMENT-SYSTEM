// DocumentDemandModel.js

import mongoose from "mongoose";

const documentDemandSchema = new mongoose.Schema({
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

const DocumentDemand = mongoose.model("DocumentDemand", documentDemandSchema);

export default DocumentDemand;
