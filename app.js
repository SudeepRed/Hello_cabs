import {mysql} from 'mysql';
import {express} from 'express';
const driver = require('./src/api/v1/models/driver')
app.use(express.json());
app.get('/driver',(req, res) => {
    driver.createTable();
})