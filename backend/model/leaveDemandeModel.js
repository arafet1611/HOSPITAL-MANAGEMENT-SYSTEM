import mongoose from "mongoose";

const leaveDemandeModel = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
  },
  leaveType: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  numberOfDays: {
    type: Number,
    required: true,
  },
  notes: {
    type: String,
    required: true,
  },
  includedFile: {
    type: String,
  },
  demandeStatus: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
  reason: {
    type: String,
    default: "no reason available",
  },
  isApplied: {
    type: Boolean,
    default: false,
  },
});

const LeaveDemande = mongoose.model("LeaveDemandeModel", leaveDemandeModel);
export default LeaveDemande;
