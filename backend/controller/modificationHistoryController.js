import ModificationHistory from "../model/modificationHistoryModel.js";
import Employee from "../model/employeeModel.js";
import mongoose from "mongoose";
const { ObjectId } = mongoose.Types; // Import ObjectId from mongoose
const createModificationHistory = async (req, res) => {
  try {
    const { employeeName, employeeId, service, changeDate } = req.body;
    console.log(employeeId);
    const idString = employeeId.toString().trim();
    console.log(idString.length);
    const employees = await Employee.find();
    console.log("id", employeeId);
    console.log(employees);

    // Find the specific employee by employeeId
    const employee = employees.find((emp) => {
      console.log(emp._id, employeeId);
      return emp._id.equals(ObjectId.createFromHexString(idString));
    });

    console.log(employee);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    if (employee.service.toString() !== service.toString()) {
      const newModification = new ModificationHistory({
        employeeName: employeeName,
        valueBeforeModification: employee.service,
        valueAfterModification: service,
        changeDate,
      });

      const savedModificationHistory = await newModification.save();

      res.status(201).json(savedModificationHistory);
    } else {
      return res.status(200).json({ message: "No service change detected" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const getAllModificationHistory = async (req, res) => {
  try {
    const Historys = await ModificationHistory.find();
    res.json(Historys);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export { createModificationHistory, getAllModificationHistory };
