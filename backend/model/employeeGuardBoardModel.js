import mongoose from "mongoose";

const employeeGuardBoardSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "employee",
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "service",
  },
  lastChangeDate: {
    type: String,
    default: Date.now(),
  },
  guardingMonth: {
    type: String,
  },
  guardingDates: {
    type: [String],
    required: true,
    default: [],
  },
});
const EmployeeGuardBoard = mongoose.model(
  "EmployeeGuardBoardSchema",
  employeeGuardBoardSchema
);
export default EmployeeGuardBoard;
