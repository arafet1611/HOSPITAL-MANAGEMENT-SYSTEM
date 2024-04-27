import Vacation from "../model/vacationModel.js";

const createVacation = async (req, res) => {
  try {
    const { vacation, startDate, endDate, numberOfDays } = req.body;
    const newVacation = await Vacation.create({
      vacation,
      startDate,
      endDate,
      numberOfDays,
    });
    res.status(201).json(newVacation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllVacations = async (req, res) => {
  try {
    const vacations = await Vacation.find();
    res.json(vacations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateVacationById = async (req, res) => {
  try {
    const updatedVacation = await Vacation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedVacation) {
      return res.status(404).json({ error: "Vacation not found" });
    }
    res.json(updatedVacation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteVacationById = async (req, res) => {
  try {
    const deletedVacation = await Vacation.findByIdAndDelete(req.params.id);
    if (!deletedVacation) {
      return res.status(404).json({ error: "Vacation not found" });
    }
    res.json(deletedVacation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export {
  createVacation,
  getAllVacations,
  updateVacationById,
  deleteVacationById,
};
