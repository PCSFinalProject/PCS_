const customDutyService = require('../services/customDutyService');

const getEntryRequests = async (req, res) => {
    try{
    const { portID } = req.params;
    const ships = await customDutyService.getEntryRequestsPort(portID);
    res.status(200).json(ships);
    }catch(err){
        res.status(500).json(err);
    }

    }


const getExitRequests = async (req, res) => {
    try{
    const { portID } = req.params;
        
    const ships = await customDutyService.getExitRequestsPort(portID);
    res.status(200).json(ships);
    }catch(err){
        res.status(500).json(err);
    }
}

const approveEntry = async (req, res) => {
    try{
    const { shipId } = req.body;
    const ship = await customDutyService.approveEntry(shipId);
    res.status(200).json(ship);
    }catch(err){
        res.status(500).json(err);
    }
}

const approveExit = async (req, res) => {
    try{
    const { shipId } = req.body;
    const ship = await customDutyService.approveExit(shipId);
    res.status(200).json(ship);
    }catch(err){
        res.status(500).json(err);
    }
}

const rejectEntryShip = async (req, res) => {
    try{
    const { shipId } = req.body;
    const ship = await customDutyService.rejectEntryShip(shipId);
    res.status(200).json(ship);
    }catch(err){
        res.status(500).json(err);

    }
}

const rejectExitShip = async (req, res) => {
    try{
    const { shipId } = req.body;
    const ship = await customDutyService.rejectExitShip(shipId);
    res.status(200).json(ship);
    }catch(err){
        res.status(500).json(err);
    }
}



const acceptImportClearance = async (req, res) => {
    try{
    const { shipId ,portId} = req.body;
    const ship = await customDutyService.approveImportClearance(shipId,portId);
    res.status(200).json(ship);
    }catch(err){
        res.status(500).json(err);
    }
}

const acceptExportClearance = async (req, res) => {
    try{
    const { shipId,portId } = req.body;
    const ship = await customDutyService.approveExportClearance(shipId, portId);
    res.status(200).json(ship);
    }catch(err){
        res.status(500).json(err);
    }
}
const rejectImportClearance = async (req, res) => {
    try{
    const { shipId } = req.body;
    const ship = await customDutyService.rejectImportClearance(shipId);
    res.status(200).json(ship);
    }catch(err){
        res.status(500).json(err);
    }
}

const rejectExportClearance = async (req, res) => {
    try{
    const { shipId } = req.body;
    const ship = await customDutyService.rejectExportClearance(shipId);
    res.status(200).json(ship);
    }catch(err){
        res.status(500).json(err);
    }
}

const getImportClearancePort = async (req, res) => {
    try{
    const { portID,type} = req.params;
    const ships = await customDutyService.getImportClearancePort(portID,type);
    res.status(200).json(ships);
    }catch(err){
        res.status(500).json(err);
    }
}

const getExportClearancePort = async (req, res) => {
    try{
    const { portID ,type} = req.params;
    const ships = await customDutyService.getExportClearancePort(portID,type);
    res.status(200).json(ships);
    }catch(err){
        res.status(500).json(err);
    }
}





module.exports = {
    getEntryRequests,
    getExitRequests,
    approveEntry,
    approveExit,
    rejectEntryShip,
    rejectExitShip,
    acceptImportClearance,
    acceptExportClearance,
    rejectImportClearance,
    rejectExportClearance,
    getImportClearancePort,
    getExportClearancePort

}

