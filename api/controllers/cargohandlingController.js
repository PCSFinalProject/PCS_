const cargoHandlingService = require('../services/cargoHandlingService');

const unloaded = async (req, res) => {
    try{
    const { shipId, portId } = req.body;
    const ship = await cargoHandlingService.unloaded(shipId, portId);
    res.status(200).json(ship);
    }catch(err){
        res.status(500).json(err);
    }
}
const loaded = async (req, res) => {
    try{
    const { shipId, portId } = req.body;
    const ship = await cargoHandlingService.loaded(shipId, portId);
    res.status(200).json(ship);
    }catch(err){
        res.status(500).json(err);
    }
}

const getUnloadedRequests = async (req, res) => {
    try{
    const { portId } = req.params;
    const ships = await cargoHandlingService.getUnloadedRequests(portId);
    res.status(200).json(ships);
    }catch(err){
        res.status(500).json(err);
    }
}

const getLoadedRequests = async (req, res) => {
    try{
    const { portId } = req.params;
    const ships = await cargoHandlingService.getLoadedRequests(portId);
    res.status(200).json(ships);
    }catch(err){
        res.status(500).json(err);
    }
}
const updateStatus = async (req, res) => {
    try{
    const { shipId, status } = req.body;
    const ship = await cargoHandlingService.completed(shipId);
    res.status(200).json(ship);
    }catch(err){
        res.status(500).json(err);
    }
}


module.exports = {
    unloaded,
    loaded,
    getUnloadedRequests,
    getLoadedRequests,
    updateStatus
}
