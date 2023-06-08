const trafficDeptService  = require('../services/trafficDeptService');

const allocateBerth = async (req, res) => {
    try{
        const { shipId } = req.body;
        const ship = await trafficDeptService.allocateBerth(shipId, berthId);
        res.status(200).json(ship);
    }catch(err){
        res.status(500).json(err);
    }
}

const requestEmptyBerth = async (req, res) => {
    try{
        const { shipId } = req.body;
        const ship = await trafficDeptService.requestEmptyBerth(shipId);
        res.status(200).json(ship);
    }catch(err){
        res.status(500).json(err);
    }
}

const getBerthRequests = async (req, res) => {
    try{
        const { portId } = req.params;
        const ships = await trafficDeptService.getBerthRequests(portId);
        res.status(200).json(ships);
    }catch(err){
        res.status(500).json(err);
    }
}
const getBerthAlllocated = async (req,res)=>{
    try{
        const { portId} = req.params;
        const ships = await trafficDeptService.getBerthAlllocated(portId);
        res.status(200).json(ships);
    }catch(err){
        res.status(500).json(err);
    }
}


module.exports = {
    allocateBerth,
    requestEmptyBerth,
    getBerthRequests,
    getBerthAlllocated

}