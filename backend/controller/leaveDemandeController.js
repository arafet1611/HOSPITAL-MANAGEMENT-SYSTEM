// leaveDemandeController.js

import LeaveDemande from "./models/LeaveDemandeModel";

export const createLeaveDemand = async (req, res) => {
  try {
    const { employee, leaveType, startDate, endDate, notes, includedFile } =
      req.body;
    const numberOfDays = Math.ceil(
      (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)
    );

    const newLeaveDemand = new LeaveDemande({
      employee,
      leaveType,
      startDate,
      numberOfDays,
      endDate,
      notes,
      includedFile,
    });

    const savedLeaveDemand = await newLeaveDemand.save();

    res.status(201).json(savedLeaveDemand);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllLeaveDemands = async (req, res) => {
  try {
    const leaveDemands = await LeaveDemande.find();
    res.json(leaveDemands);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const changeLeaveStatus = async (req, res) => {
  const { id } = req.params;
  const { demandeStatus, reason } = req.body;

  try {
    const updatedLeaveDemand = await LeaveDemande.findOneAndUpdate(
      { _id: id },
      { $set: { demandeStatus: demandeStatus, reason: reason } },
      { new: true }
    );

    if (!updatedLeaveDemand) {
      return res.status(404).json({ message: "Leave demand not found" });
    }

    res.json(updatedLeaveDemand);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
