import express from "express";
import { protectDoctor, protectNurse } from "../middleWares/authMiddleware.js";
import {
  authEmployee,
  resendPassword,
  updateEmployeeImage,
  getEmployeeById,
} from "../controller/employeeController.js";
import upload from "../middleWares/multer.js";
const router = express.Router();

router.post("/login", authEmployee);
router.post("/forgetpassword", resendPassword);
router.put(
  "/uploadimage/:employeeId",
  upload.single("image"),
  updateEmployeeImage
);
router.get("/doctor/getEmployeeById/", protectDoctor, getEmployeeById);
router.get("/:employeeId", getEmployeeById);
router.get("/nurse/getEmployeeById/", protectNurse, getEmployeeById);

export default router;
