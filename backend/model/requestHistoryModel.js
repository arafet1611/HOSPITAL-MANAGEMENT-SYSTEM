import mongoose from "mongoose";

const requestHistorySchema = new mongoose.Schema({
  employeeName: {
    type: String,
    required: true,
  },
  changeType: {
    type: String,
    enum: ["create", "update"],
    required: true,
  },
  changeDate: {
    type: Date,
    default: Date.now,
  },
});
const RequestHistory = mongoose.model("RequestHistory", requestHistorySchema);

export default RequestHistory;
