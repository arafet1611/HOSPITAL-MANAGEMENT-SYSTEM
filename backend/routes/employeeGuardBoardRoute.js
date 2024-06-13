import express from "express";
import {
  upsertGuardingDates,
  isServiceAndMonthSaved,
  getAllGuardingDatesByEmployeeIdAndYear,
  getGuardingDatesByEmployeeId,
} from "../controller/employeeGuardBoardController.js";

const router = express.Router();
router.route("/").post(upsertGuardingDates).put(upsertGuardingDates);
router.get("/check/:serviceId", isServiceAndMonthSaved);
router.get("/:employeeId", getGuardingDatesByEmployeeId);
router.get("/getAll/:employeeId", getAllGuardingDatesByEmployeeIdAndYear);
export default router;
