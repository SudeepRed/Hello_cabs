import db from "../../../config/postgreSQL.js";

function createTable() {
  db.query(`
  CREATE TABLE IF NOT EXISTS rider (
    id INT,
    name VARCHAR (255) NOT NULL,
    email VARCHAR (255) NOT NULL,
    password VARCHAR (255) NOT NULL,
    walletBalance FLOAT NOT NULL,
    currentlyInRide BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (id) );`);
}

function insertValues() {}
async function getRiderDetails(id) {
  const query = `
  SELECT name,
  currentlyinride,
  walletBalance,
  CASE rider.currentlyinride
  WHEN TRUE then (
    SELECT id from ride where rider_id = ${id} and Status = 'LIVE'
  ) 
  WHEN FALSE then null
  end as rideID
   from rider
  WHERE id = ${id};
  `;
  const { rows } = await db.query(query);
  console.log(rows);
  return rows[0];
}

async function getMyRides(id) {
  const query = `
  SELECT
  rideStartTime,
  x_source,
  y_source,
  x_destination,
  durationInMins,
  cost as "costInRupees",
  driver_id,
  (select name from rider where id = ${id} )
  from ride where rider_id = ${id};
  `;
  const { rows } = await db.query(query);
  return rows;
}

export default {
  createTable,
  insertValues,
  getRiderDetails,
  getMyRides,
};
