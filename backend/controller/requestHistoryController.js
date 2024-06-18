import RequestHistory from "../model/requestHistoryModel.js";

const createRequestHistory = async (req, res) => {
  try {
    const { employeeName, changeType, changeDate } = req.body;
    const newRequestHistory = new RequestHistory({
      employeeName,
      changeType,
      changeDate,
    });
    const savedRequestHistory = await newRequestHistory.save();
    res.status(201).json(savedRequestHistory);
  } catch (e) {
    res.status(500).json({ message: error.message });
  }
};

const getAllRequestHistory = async (req, res) => {
  try {
    const requests = await RequestHistory.find();
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export { createRequestHistory, getAllRequestHistory };
