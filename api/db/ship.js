const Ship = require('../models/ship');


const createShip = async (shipId, name, country, captain, capacity, type, cargo, shipAgencyId) => {
    try {
        const ship = new Ship({ shipId, name, country, captain, capacity, type, cargo, shipAgencyId });
        await ship.save();
        return ship;
    } catch (err) {
        console.log(err.message);
        throw err;
    }
}

const requestEntryShip = async (shipId, portId) => {
    try{
    // update the ship status to pending and portId to the portId passed in the request
    const ship = await Ship.findOneAndUpdate({shipId}, {status: 'PENDING', portId});
    return ship;
    }catch(err){
        console.log(err.message);
        throw err;
    }
}

const requestExitShip = async (shipId, shipAgencyId) => {
    try{
    // find the ship status to completed and portId to the portId passed in the request
        const ship = await Ship.findOne({shipId, shipAgencyId, status:{ $in: ['COMPLETED','UNLOADED'] }});
        if(!ship){
            throw new Error('Ship not found');
        }
        ship.status= 'REQUEST EXIT';
        await ship.save();
        return ship;
    }catch(err){
        console.log(err.message);
        throw err;
    }


    }
const getEntryRequests = async (shipAgencyId) => {
    try{
    // find all the ships with status as pending and shipAgencyId as the shipAgencyId passed in the request
    const ships = await Ship.find({status:'PENDING',shipAgencyId});
    return ships;
    }catch(err){
        console.log(err.message);
        throw err;
    }
}

const getExitRequests = async (shipAgencyId) => {
    try{
    // find all the ships with status as completed and shipAgencyId as the shipAgencyId passed in the request
    const ships = await Ship.find({status:{ $in: ['COMPLETED','UNLOADED'] },shipAgencyId});
    return ships;
    }catch(err){
        console.log(err.message);
        throw err;
    }
}

const getShips = async (shipAgencyId) => {
    try
    {
        const ships = await Ship.find({shipAgencyId});
        return ships;
    }
    catch(err)
    {
        console.log(err.message);
        throw err;
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
