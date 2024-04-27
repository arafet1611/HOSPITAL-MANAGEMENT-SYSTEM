import express from "express";
import {
  createboardtableSchema,
  updateNumberOfValues,
} from "../controller/guardBoardController.js";

const router = express.Router();

router.post("/", createboardtableSchema);
router.put("/:modelName", updateNumberOfValues);

export default router;
