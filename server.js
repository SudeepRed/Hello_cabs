import express from "express";

import driver_route from "./src/api/v1/routes/driver.js";
import ride_route from "./src/api/v1/routes/ride.js";
import rider_route from "./src/api/v1/routes/rider.js";
import r from "./src/api/v1/models/ride.js"
const app = express();
app.use(express.json());
app.listen("3001", () => {
  console.log("Server Started");
});

app.use("/driver", driver_route);
app.use("/ride", ride_route);
app.use("/rider", rider_route);

