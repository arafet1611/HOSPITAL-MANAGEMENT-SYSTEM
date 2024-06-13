import express from "express";
import { getSchemaobjectsBySchemanameAndYear } from "../controller/shemaObjectController.js";

const router = express.Router();

router.get("/:schemaName", getSchemaobjectsBySchemanameAndYear);
router.get('/')
export default router;
