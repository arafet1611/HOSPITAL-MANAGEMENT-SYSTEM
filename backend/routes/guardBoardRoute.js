import express from "express";
import {
  createboardtableSchema,
  updateNumberOfValues,
  getboardtableSchemabyService,
  updateboardtableBydates,
  createboardtable,
  getBoardTable,
} from "../controller/guardBoardController.js";

const router = express.Router();

router.post("/", createboardtableSchema);
router.post("/board", createboardtable);
router.get("/board/:schemaName", getBoardTable);
router.put("/:modelName", updateNumberOfValues);
router.put("/updateboard/:schemaName", updateboardtableBydates);
router.get("/:serviceName", getboardtableSchemabyService);
export default router;
