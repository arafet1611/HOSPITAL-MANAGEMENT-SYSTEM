import express from "express";
import {
  createboardtableSchema,
  updateNumberOfValues,
  getboardtableSchemabyService,
  updateboardtableBydates,
  createboardtable,
  getBoardTableByDate,
  getBoardHistoryTableByDate,
} from "../controller/guardBoardController.js";

const router = express.Router();

router.post("/", createboardtableSchema);
router.post("/board", createboardtable);
router.get("/board/:schemaName", getBoardTableByDate);
router.get("/boardhistory/:schemaName", getBoardHistoryTableByDate);

router.put("/:modelName", updateNumberOfValues);
router.put("/updateboard/:schemaName", updateboardtableBydates);

router.get("/:serviceName", getboardtableSchemabyService);
export default router;
