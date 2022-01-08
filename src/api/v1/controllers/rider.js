import rider from "../models/rider.js";

export async function getRider(req, res) {
  const result = await rider.getRiderDetails(req.params.id);
  res.send(result);
}
export async function getMyRides(req, res) {
  const result = await rider.getMyRides(req.params.id);
  res.send(result);
}
