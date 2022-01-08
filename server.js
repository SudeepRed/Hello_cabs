import  express from 'express';


import driver_route from './src/api/v1/routes/driver.js'

const app = express();
app.use(express.json());
app.listen('3001',()=>{
    console.log('Server Started');
})

app.use("/driver",driver_route);

