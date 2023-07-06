
const trafficDept = require('../db/trafficDept');
// const berthAllocaton = require('../utils/berth');

const allocateBerth = async (shipId,berthId) => {
    try{
        const ship = await trafficDept.allocateBerth(shipId,berthId);
        return ship;
    }catch(err){
        console.log(err.message);
        throw err;
    }
}

const requestEmptyBerth = async (shipId) => {
    try{
        const ship = await trafficDept.requestEmptyBerth(shipId);
        return ship;
    }catch(err){
        console.log(err.message);
        throw err;
    }
}

const getBerthRequests = async (portId) => {
    try{
        const ships = await trafficDept.getBerthRequests(portId);
        return ships;
    }catch(err){
        console.log(err.message);
        throw err;
    }
}

const getBerthAlllocated = async ( portID) => {
    try{
        const ships = await trafficDept.getBerthAlllocated(portID);
        return ships;
    }catch(err){
        console.log(err.message);
        throw err;
    }
}

module.exports = {
    allocateBerth,
    requestEmptyBerth,
    getBerthRequests,
    getBerthAlllocated
}

