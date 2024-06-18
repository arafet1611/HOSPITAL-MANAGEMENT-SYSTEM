import express from "express";
import {
  createModificationHistory,
  getAllModificationHistory,
} from "../controller/modificationHistoryController.js";

const router = express.Router();

router.post("/", createModificationHistory);
router.get("/", getAllModificationHistory);

export default router;
