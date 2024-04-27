import express from "express";
import {
  createVacation,
  getAllVacations,
  updateVacationById,
  deleteVacationById,
} from "../controller/vacationController.js";

const router = express.Router();

router.post("/", createVacation);
router.get("/", getAllVacations);
router.get("/:id", updateVacationById);
router.delete("/:id", deleteVacationById);

export default router;
