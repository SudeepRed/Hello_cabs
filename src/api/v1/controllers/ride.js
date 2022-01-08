import rides from "../models/ride.js";

export async function showDetailsForRide(req, res) {
  const { source, destination } = req.body;
  const result = await rides.showDetailsForRide(source, destination);
  res.send(result);
}
export async function getNearByCabs(req, res) {
  const { location, radius } = req.body;
  const result = await rides.getNearByCabs(location, radius);
  res.send(result);
}
export async function startRide(req, res) {
  const { driver_id, ride_id } = req.body;
  const result = await rides.startRide(driver_id, ride_id);
  res.send(result);
}
export async function endRide(req, res) {
  const { driver_id, ride_id } = req.body;
  const result = await rides.endRide(driver_id, ride_id);
  res.send(result);
}
export async function rateRide(req, res) {
  const { ride_id, rider_id, rating } = req.body;
  const result = await rides.rateRide(ride_id, rider_id, rating);
  res.send(result);
}
export async function bookCab(req, res) {
  const result = await rides.bookCab(req);
  res.send(result);
}