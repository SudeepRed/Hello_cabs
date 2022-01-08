import db from "../../../config/mysql";

function createTable(){
  db.query(`
  CREATE TABLE IF NOT EXISTS "user" (
    id SERIAL,
    name VARCHAR (128) NOT NULL,
    email VARCHAR (128) NOT NULL,
    password VARCHAR (128) NOT NULL,
    walletBalance FLOAT NOT NULL,
    PRIMARY KEY (id) );`
    )
}

function insertValues(){

}
export default { createTable , insertValues };