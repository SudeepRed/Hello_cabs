import db from "../../../config/postgreSQL.js";
import utils from "../utils/utility.js";
function createTable() {
  console.log(utils.durationInMins);
  const query = `
  CREATE TABLE IF NOT EXISTS ride (
    id SERIAL PRIMARY KEY,
    driver_id INT NOT NULL, 
    rider_id INT NOT NULL,
    rideStartTime TIMESTAMP,
    rideEndTime TIMESTAMP,
    x_source FLOAT,
    y_source FLOAT,
    x_destination FLOAT,
    y_destination FLOAT,
    status VARCHAR(255) DEFAULT 'LIVE',
    rating FLOAT,
    cost FLOAT GENERATED ALWAYS AS ((${utils.cost})*(${utils.distance})) STORED,
    durationInMins FLOAT GENERATED ALWAYS AS ((${utils.time})*(${utils.distance})) STORED,
    FOREIGN KEY (rider_id) REFERENCES rider (id),
    FOREIGN KEY (driver_id) REFERENCES driver(id),
    CHECK(status IN('LIVE','DONE')),
    CHECK(cost>0)
  );
    `;
  db.query(query, (err, results) => {
    if (err) throw err;
    console.log(results);
  });
}
async function getMyRides(id) {
  const query = `
  SELECT 
  rideStartTime,
  x_source,
  y_source,
  x_destination,
  y_destination,
  durationInMins,
  cost as "costInRupees",
  rider_id,
  status,
  rating from ride where driver_id = ${id};
  `;
  const { rows } = await db.query(query);
  return rows;
}

async function showDetailsForRide(source, destination) {
  const distance = utils.distCalc(
    source.x_coordinate,
    source.y_coordinate,
    destination.x_coordinate,
    destination.y_coordinate
  );
  return await JSON.stringify({
    timeNeededInMinutes: distance * utils.time,
    cost: distance * utils.cost,
  });
}

async function getNearByCabs(location, radius) {
  const { x_coordinate, y_coordinate } = location;
  const query = `
  SELECT 
  id,
  name,
  rating,
  x_coordinate,
  y_coordinate,
  total_rides
  FROM driver
  where 
  sqrt(
    power((${location.x_coordinate}-x_coordinate),2)
    +
    power((${location.y_coordinate} - y_coordinate),2)
    )<=${radius}
  `;
  const { rows } = await db.query(query);
  return rows;
}
async function bookCab(req) {
  const { source, destination, riderID } = req.body;
  const automatch = req.params.bool;
  automatch,
    (source = ""),
    (destination = ""),
    (rider_id = ""),
    (driver_id = "");
  if (automatch == "true") {
    let query = `
    SELECT id, name, x_coordinate,y_coordinate from driver WHERE rideId IS NULL;
    `;
    let { rows } = await db.query(query);

    const { id } = rows[0];
    console.log(id);
    query =
      ` INSERT INTO ride (rider_id,driver_id, x_source, y_source, x_destination, y_destination) VALUES(${rider_id}` +
      id +
      `, ${source.x_coordinate},${source.y_coordinate}, ${destination.x_coordinate},${destination.y_coordinate}) RETURNING id`;
    console.log(query);
    const result = await db.query(query);
    console.log(result);
    rows[0]["rideid"] = result.rows[0].id;
    return rows;
  } else {
    const { driver_id } = req.body;
    let query = `
    SELECT id, name, x_coordinate,y_coordinate from driver WHERE id = ${driver_id};
    `;
    let { rows } = await db.query(query);

    const { id } = rows[0];
    console.log(id);
    query =
      ` INSERT INTO ride (rider_id,driver_id, x_source, y_source, x_destination, y_destination) VALUES(${rider_id}` +
      id +
      `, ${source.x_coordinate},${source.y_coordinate}, ${destination.x_coordinate},${destination.y_coordinate}) RETURNING id`;
    console.log(query);
    const result = await db.query(query);
    console.log(result);
    rows[0]["rideid"] = result.rows[0].id;
    return rows;
  }
}
async function startRide(driver_id, ride_id) {
  const query = `
  UPDATE ride SET status = 'LIVE' where id = ${ride_id};
  UPDATE driver SET rideId = ${ride_id} WHERE id = ${driver_id};
  `;
  const msg = await db.query(query);
  return msg;
}
async function endRide(driver_id, ride_id) {
  const query = `
  UPDATE ride SET status = 'DONE' where id = ${ride_id};
  UPDATE driver SET total_rides = total_rides+1 WHERE id = ${driver_id};
  UPDATE driver SET rideId = NULL WHERE id = ${driver_id};
  `;
  const msg = await db.query(query);
  return msg;
}
async function rateRide(ride_id, rider_id, rating) {
  const query = `
  UPDATE ride SET rating = ${rating} where id = ${ride_id} and rider_id = ${rider_id};
  `;
  const msg = await db.query(query);
  return msg;
}
export default {
  createTable,
  getMyRides,
  showDetailsForRide,
  getNearByCabs,
  startRide,
  endRide,
  rateRide,
  bookCab,
};
