import { getNotificationsByServiceIdOrUserIdOrRole } from "../controller/NotificationController.js";
import express from "express";
const router = express.Router();

router.get("/:serviceId", getNotificationsByServiceIdOrUserIdOrRole);
export default router;
