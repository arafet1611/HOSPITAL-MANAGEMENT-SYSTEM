import express from "express";
import {
  createRequestHistory,
  getAllRequestHistory,
} from "../controller/requestHistoryController.js";

const router = express.Router();

router.post("/", createRequestHistory);
router.get("/", getAllRequestHistory);

export default router;
