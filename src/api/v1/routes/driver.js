import {
  updatePosition,
  getDriverPositionID,
  getdriver,
  getAlldrivers,
  getMyRides,
} from "../controllers/driver.js";

import express from "express";

const router = express.Router();
router.get("/getAllDrivers", getAlldrivers);
router.get("/getdriver:id", getdriver);
router.get("/getdriverposition", getDriverPositionID);
router.post("/updatePosition", updatePosition);
router.get("/getMyRides", getMyRides);
export default router;
