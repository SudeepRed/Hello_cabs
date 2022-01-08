import pg from "pg";
const { Pool } = pg;
const db = new Pool({
  host: "localhost",
  user: "postgres",
  password: "123456",
  database: "hellocabs",
  port: "3000",
});
db.connect((err,client,done) => {
  if (err) console.log("error");
  console.log("DB connected");
});

// db.query('show tables',(err, results)=>{
//     if(err) throw err;
//     console.log(results);
// })

export default db;
