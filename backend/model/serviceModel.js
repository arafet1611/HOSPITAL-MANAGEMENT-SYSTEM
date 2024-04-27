import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  employee: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      defaultValue: [],
    },
  ],
  title: {
    type: String,
    require: true,
  },
  content: {
    type: String,
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
});
const Service = mongoose.model("service", serviceSchema);
export default Service;
