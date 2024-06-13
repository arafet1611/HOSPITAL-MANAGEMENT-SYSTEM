import express from "express";
import {
  createPrimeByServiceAndPrime,
  UpdatePrimeByServiceAndPrime,
  getPrimeByYear,
  calculEmployeePrimeByServiceAndYear,
  getAllPrimeByServiceAndYear,
  getAllEmployeePrime,
} from "../controller/PrimeController.js";

const router = express.Router();
router.post("/", createPrimeByServiceAndPrime);
router.put("/:serviceId", UpdatePrimeByServiceAndPrime);

router.get("/:WorkingYear", getPrimeByYear);
router.get("/employeeprime/:serviceId", getAllEmployeePrime);
router.post("/calculate", calculEmployeePrimeByServiceAndYear);

router.get("/services/:serviceId", getAllPrimeByServiceAndYear);

export default router;
