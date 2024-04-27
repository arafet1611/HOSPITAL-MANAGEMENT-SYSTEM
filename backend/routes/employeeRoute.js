import express from "express";
import { authEmployee } from "../controller/employeeController.js";

const router = express.Router();

router.post("/login", authEmployee);

export default router;
