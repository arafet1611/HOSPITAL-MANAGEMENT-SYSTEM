import mongoose from "mongoose";

const rosterSchema = new mongoose.Schema({
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
    required: true,
  },
  date: {
    type: Date,
  },
  employees: {
    doctors: [
      {
        firstname: String,
        lastname: String,
        title: String,
      },
    ],
    nurses: [
      {
        firstname: String,
        lastname: String,
        title: String,
      },
    ],
    technicians: [
      {
        firstname: String,
        lastname: String,
        title: String,
      },
    ],
    workers: [
      {
        firstname: String,
        lastname: String,
        title: String,
      },
    ],
  },
});

const Roster = mongoose.model("Roster", rosterSchema);
export default Roster;
