/*
getAllDrivers
getDriver
getDriverPosition
updatePosition
getMyRides
*/
import driver from '../models/driver.js'

export async function getAlldrivers  (req, res){
    const result = await driver.getAllDrivers();
    res.send(result);
}
export async function getdriver(req, res){
  const result = await driver.getDriverByID(req.params.id);
  res.send(result);
}
export async function getDriverPositionID(req, res){
  
  const result = await driver.getDriverPosition(req.params.id);
  res.send(result);
}
export async function updatePosition(req, res) {
  const {id} = req.body;
  const {position} = req.body;

  const result = await driver.updatePosition(id,position);
  res.send(result);
}
