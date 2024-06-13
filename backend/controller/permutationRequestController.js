import PermutationRequest from "../model/permutationRequestModel.js";

export const createPermutationRequest = async (req, res) => {
  try {
    const { date, employeeSwitch, includedFile, reason } = req.body;
    const user = req.user._id;
    const newPermutationRequest = new PermutationRequest({
      user,
      date,
      employeeSwitch,
      includedFile,
      reason,
    });
    const savedPermutationRequest = new newPermutationRequest.save();
    res.status(201).json(savedPermutationRequest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const getAllPermutationRequest = async (req, res) => {
  try {
    const permutationRequest = await PermutationRequest.find();
    res.json(permutationRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const changePermutationRequestStatus = async (req, res) => {
  const { id } = req.params;
  try {
  } catch (error) {}
};
