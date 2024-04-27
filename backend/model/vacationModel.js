import mongoose from "mongoose";

const vacationSchema = mongoose.Schema(
  {
  vacation: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  numberOfDays: {
    type: Number,
    required: true,
  },
});

const Vacation = mongoose.model("Vacation", vacationSchema);
export default Vacation;
