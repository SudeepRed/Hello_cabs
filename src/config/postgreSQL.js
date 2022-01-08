import pg from "pg";
import utils from "../api/v1/utils/utility.js";
const { Pool } = pg;
const db = new Pool({
  host: "localhost",
  user: "postgres",
  password: "123456",
  database: "hellocabs",
  port: "3000",
});
db.connect((err, client, done) => {
  if (err) console.log("error");
  console.log("DB connected");
});
db.query(utils.distanceQuery, (err, client, done) => {
  if (err) throw err;
  console.log("distance function created");
});

export default db;
