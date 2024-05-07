import express from "express";
import {
  authEmployee,
  resendPassword,
} from "../controller/employeeController.js";

const router = express.Router();

router.post("/login", authEmployee);
router.post("/forgetpassword", resendPassword);

export default router;
