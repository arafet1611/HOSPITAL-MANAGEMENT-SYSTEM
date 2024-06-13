import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "https://i.imgur.com/ogBYT9J.png",
  },
  content: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});
const Service = mongoose.model("Service", serviceSchema);
export default Service;
