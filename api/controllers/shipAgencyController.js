const shipAgencyService = require('../services/shipAgencyService');


const createShip = async (req, res) => {
    try{
    const { name, country, captain, cargo, capacity,type ,shipAgencyId} = req.body;
    const ship = await shipAgencyService.createShip(name, country, captain, capacity, type, cargo ,shipAgencyId);
    res.status(200).json(ship);
    }catch(err){
        res.status(500).json(err);
    }
}

const requestEntryShip = async (req, res) => {
    try{
    const { shipId, portId } = req.body;
    const ship = await shipAgencyService.requestEntryShip(shipId, portId);
    res.status(200).json(ship);
    }catch(err){
        res.status(500).json(err);
    }
}

const requestExitShip = async (req, res) => {
    try{
    const { shipId ,shipAgencyId} = req.body;
    const ship = await shipAgencyService.requestExitShip(shipId,shipAgencyId);
    res.status(200).json(ship);
    }catch(err){
        res.status(500).json(err);
    }
}
const getEntryRequests = async (req, res) => {
    try{
    const { shipAgencyId } = req.params;
    const ships = await shipAgencyService.getEntryRequests(shipAgencyId);
    res.status(200).json(ships);
    }catch(err){
        res.status(500).json(err);
    }
}

const getExitRequests = async (req, res) => {
    try{
    const { shipAgencyId } = req.params;
        
    const ships = await shipAgencyService.getExitRequests(shipAgencyId);
    res.status(200).json(ships);
    }catch(err){
        res.status(500).json(err);
    }
}
const getShips = async (req, res) => {
    try{
    const { shipAgencyId } = req.params;
    const ships = await shipAgencyService.getShips(shipAgencyId);
    res.status(200).json(ships);
    }catch(err){
        res.status(500).json(err);
    }
}


module.exports = {
    createShip,
    requestEntryShip,
    requestExitShip,
    getEntryRequests,
    getExitRequests,
    getShips

}
