import express from "express";
import {
  createPermutationRequest,
  getAllPermutationRequest,
  changePermutationRequestStatus,
  getPermutationRequestByMonthAndService,
  getPermutationRequestByEmployeeId,
  markPermutationRequestAsApplied,
} from "../controller/permutationRequestController.js";
const router = express.Router();
import upload from "../middleWares/multer.js";
import { protectDoctor } from "../middleWares/authMiddleware.js";

router.post(
  "/",
  protectDoctor,
  upload.single("file"),
  createPermutationRequest
);
router.get("/", getAllPermutationRequest);
router.put("/:id", changePermutationRequestStatus);
router.get("/:serviceId", getPermutationRequestByMonthAndService);
router.get("/employee/:employeeId", getPermutationRequestByEmployeeId);
router.put("/mark-as-applied/:id", markPermutationRequestAsApplied);
export default router;
