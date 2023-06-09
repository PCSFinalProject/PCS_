const customOfficer = require('../db/customOfficer');
const getEntryRequestsPort = async (portId) => { 
    try{
        const ships = await customOfficer.getEntryRequestsPort(portId);
        return ships;
    }catch(err){
        console.log(err.message);
        throw err;
    }
}

const getExitRequestsPort = async (portId) => {
    try{
        const ships = await customOfficer.getExitRequestsPort(portId);
        return ships;
    }catch(err){
        console.log(err.message);
        throw err;
    }
}

const approveEntry = async (shipId, portId) => {
    try{
        const ship = await customOfficer.approveEntryShip(shipId, portId);
        return ship;
    }catch(err){
        console.log(err.message);
        throw err;
    }
}

const approveExit = async (shipId, portId) => {
    try{
        const ship = await customOfficer.approveExitShip(shipId, portId);
        return ship;
    }catch(err){
        console.log(err.message);
        throw err;
    }
}

const rejectEntryShip = async (shipId, portId) => {
    try{
        const ship = await customOfficer.rejectEntryShip(shipId, portId);
        return ship;
    }catch(err){
        console.log(err.message);
        throw err;
    }
}

const rejectExitShip = async (shipId, portId) => {
    try{

        const ship = await customOfficer.rejectExitShip(shipId, portId);

        return ship;
    }catch(err){
        console.log(err.message);
        throw err;
    }
}

const getImportClearancePort = async (portId,type) => {
    try{
        const ships = await customOfficer.getImportClearancePort(portId,type);
        return ships;
    }catch(err){
        console.log(err.message);
        throw err;
    }
}

const getExportClearancePort = async (portId,type) => {
    try{
        const ships = await customOfficer.getExportClearancePort(portId,type);
        return ships;
    }catch(err){
        console.log(err.message);
        throw err;
    }
}

const approveImportClearance = async (shipId) => {
    try{
        const ship = await customOfficer.approveImportClearance(shipId);
        return ship;
    }catch(err){
        console.log(err.message);
        throw err;
    }
}

const approveExportClearance = async (shipId) => {
    try{
        const ship = await customOfficer.approveExportClearance(shipId);
        return ship;
    }catch(err){
        console.log(err.message);
        throw err;
    }
    }

const rejectImportClearance = async (shipId) => {
    try{
        const ship = await customOfficer.rejectImportClearance(shipId);
        return ship;
    }catch(err){
        console.log(err.message);
        throw err;
    }
}

const rejectExportClearance = async (shipId) => {
    try{
        const ship = await customOfficer.rejectExportClearance(shipId);
        return ship;
    }catch(err){
        console.log(err.message);
        throw err;
    }
}


module.exports = {
    getEntryRequestsPort,
    getExitRequestsPort,
    approveEntry,
    approveExit,
    rejectEntryShip,
    rejectExitShip,
    getImportClearancePort,
    getExportClearancePort,
    approveImportClearance,
    approveExportClearance,
    rejectImportClearance,
    rejectExportClearance
    

}
