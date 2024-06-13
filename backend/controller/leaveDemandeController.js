import LeaveDemande from "../model/leaveDemandeModel.js";
import Notification from "../model/NotificationModel.js";
import { getIoInstance } from "../configs/socketHandler.js";
export const createLeaveDemand = async (req, res) => {
  try {
    const { leaveType, startDate, endDate, notes } = req.body;
    const user = req.user;
    const fileName = req.file.filename;

    const numberOfDays = Math.ceil(
      (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)
    );

    const newLeaveDemand = new LeaveDemande({
      employee: user._id,
      leaveType,
      startDate,
      numberOfDays,
      endDate,
      notes,
      includedFile: fileName,
      isApplied: false,
    });

    const savedLeaveDemand = await newLeaveDemand.save();

    res.status(201).json(savedLeaveDemand);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllLeaveDemands = async (req, res) => {
  try {
    const leaveDemands = await LeaveDemande.find().populate({
      path: "employee",
      populate: { path: "service" },
    });
    res.json(leaveDemands);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const changeLeaveStatus = async (req, res) => {
  const { id } = req.params;
  const { userId, demandeStatus, startDate, endDate, serviceId } = req.body;

  try {
    const updatedLeaveDemand = await LeaveDemande.findOneAndUpdate(
      { _id: id },
      { $set: { demandeStatus: demandeStatus } },
      { new: true }
    );

    if (!updatedLeaveDemand) {
      return res.status(404).json({ message: "Leave demand not found" });
    }

    const notification = new Notification({
      serviceId,
      userId,
      message: `your leave request from ${startDate} to ${endDate} has been ${demandeStatus}`,
    });
    await notification.save();

    const io = getIoInstance();
    console.log(io);
    if (io) {
      io.emit("leaveRequestStatusChange", {
        message: `your leave request from ${startDate} to ${endDate} has been ${demandeStatus}`,
        serviceId,
        userId,
      });
      console.log("leaveRequestStatusChange event emitted:", {
        message: `your leave request from ${startDate} to ${endDate} has been ${demandeStatus}`,
        serviceId,
        userId,
      });
    } else {
      console.log("Socket.io instance not available");
    }

    res.json(updatedLeaveDemand);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const getLeaveDemandsByMonthAndService = async (req, res) => {
  const { serviceId } = req.params;
  const { month, year } = req.query;

  try {
    const monthInt = parseInt(month, 10);
    const yearInt = parseInt(year, 10);

    if (isNaN(monthInt) || isNaN(yearInt)) {
      return res.status(400).json({ message: "Invalid month or year" });
    }

    const startOfMonth = new Date(yearInt, monthInt - 1, 1);
    const endOfMonth = new Date(yearInt, monthInt, 0, 23, 59, 59);

    const leaveDemands = await LeaveDemande.find({
      startDate: { $gte: startOfMonth, $lte: endOfMonth },
      demandeStatus: "Accepted",
    })
      .populate({
        path: "employee",
        match: { service: serviceId },
        populate: { path: "service" },
      })
      .exec();

    const filteredLeaveDemands = leaveDemands.filter((ld) => ld.employee);

    res.json(filteredLeaveDemands);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const markLeaveAsApplied = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedLeaveDemand = await LeaveDemande.findOneAndUpdate(
      { _id: id },
      { $set: { isApplied: true } },
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
