import db from "../../../config/postgreSQL.js";

//Function to create Table
function createTable() {
  let query = `CREATE TABLE IF NOT EXISTS driver(
    id INT,
    email VARCHAR (255) NOT NULL,
    password VARCHAR (255) NOT NULL,
    name VARCHAR (255) NOT NULL,
    rating FLOAT NOT NULL,
    status VARCHAR (255) NOT NULL,
    position FLOAT NOT NULL,
    total_rides INT,
    rideId INT,
    x_coordinate FLOAT,
    y_coordinate FLOAT,
    PRIMARY KEY (id))`;

  db.query(query, (err, result) => {
    if (err) throw err;
    console.log(result);
  });
}
function insertValues() {

}

// getAllDrivers
async function getAllDrivers() {
  const query = `SELECT * FROM driver;`;
  const { rows } = await db.query(query);
  return rows;
}
// getDriver
async function getDriverByID(id) {
  const query = `SELECT * from driver WHERE id = '${id}'`;
  const { rows } = await db.query(query);
  return rows[0];
}

// getDriverPosition
async function getDriverPosition(id) {
  const query = `SELECT x_coordinate, y_coordinate from driver WHERE id = '${id}'`;
  const { rows } = await db.query(query);
  return rows[0];
}
// updatePosition
async function updatePosition(id,position) {
  const query = `
  UPDATE driver SET 
  x_coordinate = '${position.x_loc}', 
  y_coordinate = '${position.y_loc} 
  'where id = '${id}';
  `
db.query(query);
}
// getMyRides

export default {
  createTable,
  insertValues,
  getAllDrivers,
  getDriverByID,
  getDriverPosition,
  updatePosition
};
