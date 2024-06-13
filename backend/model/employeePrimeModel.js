import mongoose from "mongoose";

const employeePrimeModel = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
  },
  workingYear: {
    type: String,
  },
  nbOfDaysResidentWorkingOnWeekend: {
    type: Number,
    default: 0,
    min: 0,
  },
  nbOfDaysResidentWorkingOnHolidays: {
    type: Number,
    default: 0,
    min: 0,
  },
  nbOfDaysResidentWorkingOnRegularDays: {
    type: Number,
    default: 0,
    min: 0,
  },
  nbOfDaysAssistantWorkingOnWeekend: {
    type: Number,
    default: 0,
    min: 0,
  },
  nbOfDaysAssistantWorkingOnHolidays: {
    type: Number,
    default: 0,
    min: 0,
  },
  nbOfDaysAssistantWorkingOnRegularDays: {
    type: Number,
    default: 0,
    min: 0,
  },
  nbOfDaysSeniorWorkingOnWeekend: {
    type: Number,
    default: 0,
    min: 0,
  },
  nbOfDaysSeniorWorkingOnHolidays: {
    type: Number,
    default: 0,
    min: 0,
  },
  nbOfDaysSeniorWorkingOnRegularDays: {
    type: Number,
    default: 0,
    min: 0,
  },
  bonusTotal: {
    type: Number,
    default: 0,
  },
});

const EmployeePrime = mongoose.model("EmployeePrime", employeePrimeModel);
export default EmployeePrime;
