import mongoose from "mongoose";

const permuationRequestModel = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
  },
  date: {
    type: Date,
    required: true,
  },
  employeeSwitch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
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
});
const PermutationRequest = mongoose.model(
  "PermutationRequest",
  permuationRequestModel
);
export default PermutationRequest;
