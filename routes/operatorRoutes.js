import express from "express";
import operatorController from "../controllers/operatorController.js";

const router = express.Router();

router.post("/", operatorController.createOperator);

export default router;