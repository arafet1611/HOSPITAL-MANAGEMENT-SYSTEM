import express from "express";
import {
  createTrainingDemand,
  getAllTrainingDemands,
  changeTrainingDemandStatus,
} from "../controller/trainingDemandeController.js";
const router = express.Router();

router.post("/", createTrainingDemand);
router.get("/", getAllTrainingDemands);
router.put("/:id", changeTrainingDemandStatus);

export default router;
