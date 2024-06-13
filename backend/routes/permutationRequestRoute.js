import express from "express";
import {
  createPermutationRequest,
  getAllPermutationRequest,
  changePermutationRequestStatus,
} from "../controller/permutationRequestController.js";
const router = express.Router();

router.post("/", createPermutationRequest);
router.get("/", getAllPermutationRequest);
router.put("/:id", changePermutationRequestStatus);

export default router;
