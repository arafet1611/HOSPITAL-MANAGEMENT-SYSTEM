import mongoose from "mongoose";

const PrimeModel = new mongoose.Schema({
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
  },
  workingYear: {
    type: String,
  },
  residentWorkingOnWeekendBonus: {
    type: Number,
    default: 0,
    min: 0,
  },
  residentWorkingOnHolidaysBonus: {
    type: Number,
    default: 0,
    min: 0,
  },
  residentWorkingOnRegularDaysBonus: { type: Number, default: 0, min: 0 },

  assistantWorkingOnWeekendBonus: {
    type: Number,
    default: 0,
    min: 0,
  },
  assistantWorkingOnHolidaysBonus: {
    type: Number,
    default: 0,
    min: 0,
  },
  assistantWorkingOnRegularDaysBonus: { type: Number, default: 0, min: 0 },

  seniorWorkingOnWeekendBonus: {
    type: Number,
    default: 0,
    min: 0,
  },
  seniorWorkingOnHolidaysBonus: {
    type: Number,
    default: 0,
    min: 0,
  },
  seniorWorkingOnRegularDaysBonus: { type: Number, default: 0, min: 0 },
});

const Prime = mongoose.model("Prime", PrimeModel);
export default Prime;
