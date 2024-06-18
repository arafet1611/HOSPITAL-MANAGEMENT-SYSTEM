import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
  },
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  image: {
    type: String,
  },
  password: {
    type: String,
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  sex: {
    type: String,
  },
  job: {
    type: String,
  },
  dateJoining: {
    type: Date,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});
const Employee = mongoose.model("Employee", employeeSchema);
export default Employee;
