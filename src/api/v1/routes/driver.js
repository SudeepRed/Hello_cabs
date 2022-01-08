import {
  updatePosition,
  getDriverPositionID,
  getdriver,
  getAlldrivers,
} from "../controllers/driver.js";

import express from "express";

const router = express.Router();
router.get("/getAllDrivers", getAlldrivers);
router.get("/getdriver:id", getdriver);
router.get("/getdriverposition", getDriverPositionID);
router.post("/updatePosition", updatePosition);
export default router;
