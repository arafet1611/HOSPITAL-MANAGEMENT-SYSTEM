// documentDemandController.js

import DocumentDemand from "./models/DocumentDemandModel";

// Controller function to create a new document demand
export const createDocumentDemand = async (req, res) => {
  try {
    const { employee, documentType, notes } = req.body;

    const newDocumentDemand = new DocumentDemand({
      employee,
      documentType,
      notes,
      demandeStatus: "pending",
    });

    const savedDocumentDemand = await newDocumentDemand.save();

    res.status(201).json(savedDocumentDemand);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllDocumentDemands = async (req, res) => {
  try {
    const documentDemands = await DocumentDemand.find();
    res.json(documentDemands);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const changeDocumentDemandStatus = async (req, res) => {
  const { id } = req.params;
  const { demandeStatus, attachedFile, reason } = req.body;

  try {
    const updatedDocumentDemand = await DocumentDemand.findOneAndUpdate(
      { _id: id },
      { $set: { demandeStatus, attachedFile, reason } },
      { new: true }
    );

    if (!updatedDocumentDemand) {
      return res.status(404).json({ message: "Document demand not found" });
    }

    res.json(updatedDocumentDemand);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
