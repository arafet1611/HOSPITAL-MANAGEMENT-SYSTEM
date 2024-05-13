import express from "express";
import {
  createRoster,
  getAllRosters,
  getRostersByDateAndService,
} from "../controller/rosterController.js";

const router = express.Router();

router.post("/", createRoster);
router.get("/", getAllRosters);
router.get("/getBy", getRostersByDateAndService);

export default router;
