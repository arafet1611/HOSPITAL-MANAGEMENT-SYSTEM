import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: true,
  },
});

const Admin = mongoose.model("Admin", adminSchema);
export default Admin;
