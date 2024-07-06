import express from "express";
import { protectAdmin } from "../middleWares/authMiddleware.js";
import { authAdmin } from "../controller/adminController.js";
const router = express.Router();

router.post("/login", authAdmin);

export default router;
