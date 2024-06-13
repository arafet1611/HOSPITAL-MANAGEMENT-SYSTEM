import express from "express";
import {
  createDocumentDemand,
  getAllDocumentDemands,
  changeDocumentDemandStatus,
} from "../controller/documentDemandeController.js";
const router = express.Router();

router.post("/", createDocumentDemand);
router.get("/", getAllDocumentDemands);
router.put("/:id", changeDocumentDemandStatus);

export default router;
