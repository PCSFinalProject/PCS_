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
    const ship = await Ship.findOne({shipId, status:{$in: ['UNLOADED', 'REQUEST EXIT','COMPLETED']}});
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
    const ship = await Ship.findOneAndUpdate({shipId, status: 'PENDING'});
    ship.status = 'ENTRY REJECTED';
    await ship.save();
    return ship;
    }catch(err){
        console.log(err.message);
        throw err;
    }
}

const rejectExitShip = async (shipId) => {
    try{
    // update the ship status to EXIT REJECTED and portId to the portId passed in the request
    const ship = await Ship.findOne({shipId, status:{$in: ['UNLOADED', 'REQUEST EXIT','COMPLETED']}});
    ship.status = 'EXIT REJECTED';
    await ship.save();
    return ship;
    }catch(err){
        console.log(err.message);
        throw err;
    }
}

const getImportClearancePort = async (portId) => {
    try{
    // find all the ships with status as ENTRY ACCEPTED and portId as the portId passed in the request
    const ships = await Ship.find({status:'DOCKED',portId});
    return ships;
    }catch(err){
        console.log(err.message);
        throw err;
    }
}

const getExportClearancePort = async (portId) => {
    try{
    // find all the ships with status as EXIT ACCEPTED and portId as the portId passed in the request
    const ships = await Ship.find({status:'DOCKED',portId});
    return ships;
    }catch(err){
        console.log(err.message);

        throw err;
    }
}

const acceptImportClearance = async (shipId ,portId) => {
    try{
    // update the ship status to UNLOADING and portId to the portId passed in the request
    const ship  = Ship.findOne({shipId, status:'DOCKED'},portId);
    ship.status = 'REQUEST UNLOADING';
    await ship.save();
    return ship;
    }catch(err){
        console.log(err.message);
        throw err;
    }
}

const acceptExportClearance = async (shipId,portId) => {
    try{
    // update the ship status to EXITING and portId to the portId passed in the request
    const ship  = Ship.findOne({shipId, status:'DOCKED'},portId);
    ship.status = 'REQUEST LOADING';
    await ship.save();
    return ship;
    }catch(err){
        console.log(err.message);
        throw err;
    }
}

const rejectImportClearance = async (shipId,portId) => {
    try{
    // update the ship status to ENTRY REJECTED and portId to the portId passed in the request
    const ship  = Ship.findOne({shipId, status:'DOCKED'},portId);
    ship.status = 'REJECTED';
    await ship.save();
    return ship;
    }catch(err){
        console.log(err.message);
        throw err;
    }
}

const rejectExportClearance = async (shipId,portId) => {
    try{
    // update the ship status to EXIT REJECTED and portId to the portId passed in the request
    const ship  = Ship.findOne({shipId, status:'DOCKED'},portId);
    ship.status = 'REJECTED';
    await ship.save();
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

