const Ship = require('../models/ship');


const getEntryRequestsPort = async (portId) => {
    try{
    // find all the ships with status as pending and portId as the portId passed in the request
    const ships = await Ship.find({status:'PENDING',portId});
    return ships;
    }catch(err){
        console.log(err.message);
        throw err;
    }
}

const getExitRequestsPort = async (portId) => {
    try{
    // find all the ships with status as completed and portId as the portId passed in the request
    const ships = await Ship.find({status:{ $in: ['COMPLETED','UNLOADED'] },portId});
    return ships;
    }catch(err){
        console.log(err.message);
        throw err;
    }
}

const getShipsPort = async (portId) => {
    try
    {
        const ships = await Ship.find({portId});
        return ships;
    }catch(err){
        console.log(err.message);
        throw err;
    }
}

const approveEntryShip = async (shipId) => {
    try{
    // update the ship status to ENTRY ACCEPTED and portId to the portId passed in the request
    const ship = await Ship.findOne({shipId, status: 'PENDING'});
    ship.status = 'ENTRY ACCEPTED';
    await ship.save();
    return ship;
    }catch(err){
        console.log(err.message);
        throw err;
    }
}


const approveExitShip = async (shipId) => {
    try{
    // update the ship status to EXIT ACCEPTED and portId to the portId passed in the request
    const ship = await Ship.findOne({shipId, status:{$in: ['UNLOADED', 'REQUEST EXIT','COMPLETED','REQUESTING EMPTY BERTH']}});
    ship.status = 'EXIT ACCEPTED';
    await ship.save();
    return ship;
    }catch(err){
        console.log(err.message);
        throw err;
    }
}

const rejectEntryShip = async (shipId) => {
    try{
    // update the ship status to ENTRY REJECTED and portId to the portId passed in the request
    const ship = await Ship.findOneAndUpdate({shipId, status: 'PENDING'},{$set:{status:'ENTRY REJECTED'}},{new:true});
  
    return ship;
    }catch(err){
        console.log(err.message);
        throw err;
    }
}

const rejectExitShip = async (shipId) => {
    try{
    // update the ship status to EXIT REJECTED and portId to the portId passed in the request
    const ship = await Ship.findOneAndUpdate({shipId, status:{$in: ['UNLOADED', 'REQUEST EXIT','COMPLETED','REQUESTING EMPTY BERTH']}},{status:'EXIT REJECTED'}, {new:true});
   
    return ship;
    }catch(err){
        console.log(err.message);
        throw err;
    }
}

const getImportClearancePort = async (portId,type) => {
    try{
    // find all the ships with status as ENTRY ACCEPTED and portId as the portId passed in the request
    const ships = await Ship.find({status:'DOCKED',portId,type});
    return ships;
    }catch(err){
        console.log(err.message);
        throw err;
    }
}

const getExportClearancePort = async (portId,type) => {
    try{
    // find all the ships with status as EXIT ACCEPTED and portId as the portId passed in the request
    const ships = await Ship.find({status:'DOCKED',portId,type});
    return ships;
    }catch(err){
        console.log(err.message);

        throw err;
    }
}

const acceptImportClearance = async (shipId) => {
    try{
    // update the ship status to UNLOADING and portId to the portId passed in the request
    const ship  = Ship.findOneAndUpdate({shipId, status:'DOCKED'},{$set:{status:'REQUEST UNLOADING'}},{new:true});
   
    return ship;
    }catch(err){
        console.log(err.message);
        throw err;
    }
}

const acceptExportClearance = async (shipId) => {
    try{
    // update the ship status to EXITING and portId to the portId passed in the request
    const ship  = Ship.findOneAndUpdate({shipId, status:'DOCKED'},{$set:{status:'REQUEST LOADING'}},{new:true});
  
    return ship;
    }catch(err){
        console.log(err.message);
        throw err;
    }
}

const rejectImportClearance = async (shipId) => {
    try{
    // update the ship status to ENTRY REJECTED and portId to the portId passed in the request
    const ship  = Ship.findOneAndUpdate({shipId, status:'DOCKED'},{$set:{status:'REJECTED'}},{new:true});
 
    return ship;
    }catch(err){
        console.log(err.message);
        throw err;
    }
}

const rejectExportClearance = async (shipId) => {
    try{
    // update the ship status to EXIT REJECTED and portId to the portId passed in the request
    const ship  = Ship.findOneAndUpdate({shipId, status:'DOCKED'},{$set:{status:'REJECTED'}},{new:true});
   
    return ship;
    }catch(err){
        console.log(err.message);

    }
}



module.exports = {
    getEntryRequestsPort,
    getExitRequestsPort,
    getShipsPort,
    approveEntryShip,
    approveExitShip,
    rejectEntryShip,
    rejectExitShip,
    getImportClearancePort,
    getExportClearancePort,
    acceptImportClearance,
    acceptExportClearance,
    rejectImportClearance,
    rejectExportClearance

}

