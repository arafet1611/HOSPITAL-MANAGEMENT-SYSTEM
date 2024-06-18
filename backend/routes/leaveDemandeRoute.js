import express from "express";
import {
  createLeaveDemand,
  getAllLeaveDemands,
  changeLeaveStatus,
  getLeaveDemandsByMonthAndService,
  markLeaveAsApplied,
  getLeaveDemandsByEmployeeId,
} from "../controller/leaveDemandeController.js";
import upload from "../middleWares/multer.js";
import { protectDoctor } from "../middleWares/authMiddleware.js";
const router = express.Router();
router.post("/", protectDoctor, upload.single("file"), createLeaveDemand);
router.get("/", getAllLeaveDemands);
router.put("/:id", changeLeaveStatus);
router.get("/:serviceId", getLeaveDemandsByMonthAndService);
router.get("/employee/:employeeId", getLeaveDemandsByEmployeeId);
router.put("/mark-as-applied/:id", markLeaveAsApplied);

export default router;
