import express from "express";
import {
  createService,
  getAllServices,
  getService,
  getTitle,
  updateService,
  deleteService,
} from "../controller/serviceController.js";
import upload from "../middleWares/multer.js";

const router = express.Router();

router.post("/", upload.single("image"), createService);
router.get("/", getAllServices);
router.get("/:id", getService);
router.put("/:id", upload.single("image"), updateService);
router.delete("/:id", deleteService);
router.get("/title/:id", getTitle);
export default router;
