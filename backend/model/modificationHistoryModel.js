import mongoose from "mongoose";

const modificationHistorySchema = new mongoose.Schema({
  employeeName: {
    type: String,
    required: true,
  },
  valueBeforeModification: {
    type: String,
    required: true,
  },
  valueAfterModification: {
    type: String,
    required: true,
  },
  modificationDate: {
    type: String,
    default: Date.now,
  },
  changeDate: {
    type: Date,
    default: Date.now,
  },
});

const ModificationHistory = mongoose.model(
  "ModificationHistory",
  modificationHistorySchema
);
export default ModificationHistory;
