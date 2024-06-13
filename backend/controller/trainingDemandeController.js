import TrainingDemande from "../model/trainingDemandeModel.js";

export const createTrainingDemand = async (req, res) => {
  try {
    const { TrainingType, notes, includedFile } = req.body;
    const user = req.user._id;
    const newTrainingDemand = new TrainingDemande({
      user,
      TrainingType,
      notes,
      includedFile,
      demandeStatus: "pending",
    });

    const savedTrainingDemand = await newTrainingDemand.save();

    res.status(201).json(savedTrainingDemand);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllTrainingDemands = async (req, res) => {
  try {
    const trainingDemands = await TrainingDemande.find();
    res.json(trainingDemands);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const changeTrainingDemandStatus = async (req, res) => {
  const { id } = req.params;
  const { demandeStatus, reason } = req.body;

  try {
    const updatedTrainingDemand = await TrainingDemande.findOneAndUpdate(
      { _id: id },
      { $set: { demandeStatus: demandeStatus, reason: reason } },
      { new: true }
    );

    if (!updatedTrainingDemand) {
      return res.status(404).json({ message: "Training demand not found" });
    }

    res.json(updatedTrainingDemand);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
