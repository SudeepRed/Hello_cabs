import { getRider, getMyRides } from "../controllers/rider.js";

import express from "express";

const router = express.Router();
router.get("/getRider:id", getRider);
router.get("/getMyRides:id", getMyRides);

export default router;
