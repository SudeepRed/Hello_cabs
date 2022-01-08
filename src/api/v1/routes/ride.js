import {
  rateRide,
  endRide,
  startRide,
  getNearByCabs,
  showDetailsForRide,
  bookCab
} from "../controllers/ride.js";

import express from "express";

const router = express.Router();
router.post("/rateRide", rateRide);
router.post("/endRide", endRide);
router.post("/startRide", startRide);
router.post("/getNearByCabs", getNearByCabs);
router.post("/showDetailsForRide", showDetailsForRide);
router.get("/bookCab/automatch=:automatch", bookCab);
export default router;
