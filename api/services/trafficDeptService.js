
const trafficDept = require('../db/trafficDept');
const berthAllocaton = require('../utils/berth');

const allocateBerth = async (shipId) => {
    try{
        const ship = await trafficDept.allocateBerth(shipId);
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

const getBerthRequests = async (portID) => {
    try{
        const ships = await trafficDept.getBerthRequests(portID);
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

