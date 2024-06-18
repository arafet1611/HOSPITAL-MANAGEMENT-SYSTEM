import PermutationRequest from "../model/permutationRequestModel.js";

export const createPermutationRequest = async (req, res) => {
  try {
    const { date, employeeSwitch, reason } = req.body;
    const user = req.user._id;
    const service = req.user.service;
    const fileName = req.file.filename;

    console.log(service);
    const newPermutationRequest = new PermutationRequest({
      employee: user,
      date,
      service,
      employeeSwitch,
      includedFile: fileName,
      reason,
      isApplied: false,
    });
    const savedPermutationRequest = await newPermutationRequest.save();
    res.status(201).json(savedPermutationRequest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const getAllPermutationRequest = async (req, res) => {
  try {
    const permutationRequests = await PermutationRequest.find()
      .populate({
        path: "employee",
        populate: { path: "service" },
      })
      .populate("employeeSwitch");

    res.json(permutationRequests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const changePermutationRequestStatus = async (req, res) => {
  const { id } = req.params;
  const { demandeStatus } = req.body;

  try {
    const updatedPermutationRequest = await PermutationRequest.findOneAndUpdate(
      { _id: id },
      { $set: { demandeStatus: demandeStatus } },
      { new: true }
    );
    res.json(updatedPermutationRequest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const getPermutationRequestByMonthAndService = async (req, res) => {
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

    const permutationRequests = await PermutationRequest.find({
      date: { $gte: startOfMonth, $lte: endOfMonth },
      demandeStatus: "Accepted",
    })
      .populate({
        path: "employee",
        match: { service: serviceId },
        populate: { path: "service" },
      })
      .populate("employeeSwitch")
      .exec();
    console.log("permutatuin", permutationRequests);
    const filteredPermutationRequests = permutationRequests.filter(
      (ld) => ld.employee
    );

    res.json(filteredPermutationRequests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getPermutationRequestByEmployeeId = async (req, res) => {
  const { employeeId } = req.params;
  console.log(employeeId);
  try {
    const PermutationRequests = await PermutationRequest.find({
      employee: employeeId,
    })
      .populate({
        path: "employee",
        populate: { path: "service" },
      })
      .populate("employeeSwitch");

    console.log(PermutationRequests);
    if (!PermutationRequests.length) {
      return res
        .status(404)
        .json({ message: "No leave demands found for this employee" });
    }

    res.json(PermutationRequests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const markPermutationRequestAsApplied = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedPermutationRequest = await PermutationRequest.findOneAndUpdate(
      { _id: id },
      { $set: { isApplied: true } },
      { new: true }
    );

    if (!updatedPermutationRequest) {
      return res.status(404).json({ message: "Leave demand not found" });
    }

    res.json(updatedPermutationRequest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
