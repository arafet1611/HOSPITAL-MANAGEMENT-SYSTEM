import express from "express";
import {
  createService,
  getAllServices,
  getService,
  updateService,
  deleteService,
} from "../controller/serviceController.js";

const router = express.Router();

router.post("/", createService);
router.get("/", getAllServices);
router.get("/:id", getService);
router.put("/:id", updateService);
router.delete("/:id", deleteService);

export default router;
