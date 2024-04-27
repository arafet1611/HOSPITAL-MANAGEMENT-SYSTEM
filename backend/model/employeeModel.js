import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  firstname: {
    type: String,
    require: true,
  },
  lastname: {
    type: String,
    require: true,
  },
  image: {
    type: String,
  },
  phone: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  dateJoining: {
    type: Date,
  },
});
export const Employee = mongoose.model("Employee", employeeSchema);
