const Ship = require('../db/ship');

const unloaded = async (shipId, portId) => {
    try{
        const ship = await Ship.findOne({shipId, portId, status: 'REQUESTING EXIT'});
        if(!ship){
            throw new Error('Ship not found');
        }
        ship.status= 'UNLOADING';
        await ship.save();
        return ship;
    }catch(err){
        console.log(err.message);
        throw err;
    }
}

const loaded = async (shipId, portId) => {
    try{
        const ship = await Ship.findOne({shipId, portId, status: 'PENDING'});
        if(!ship){
            throw new Error('Ship not found');
        }
        ship.status= 'LOADING';
        await ship.save();
        return ship;
    }catch(err){
        console.log(err.message);
        throw err;
    }
}

const completed = async (shipId, portId) => {
    try{
        const ship = await Ship.findOne({shipId, portId, status: 'REQUESTING EXIT'});
        if(!ship){
            throw new Error('Ship not found');
        }
        ship.status= 'COMPLETED';
        await ship.save();
        return ship;
    }catch(err){
        console.log(err.message);
        throw err;
    }
}

const getUnloadedRequests = async (portId) => {
    try{
        const ships = await Ship.find({status: 'REQUESTING EXIT', portId});
        return ships;
    }catch(err){
        console.log(err.message);
        throw err;
    }
}

const getLoadedRequests = async (portId) => {
    try{
        const ships = await Ship.find({status: 'PENDING', portId});
        return ships;
    }catch(err){
        console.log(err.message);
        throw err;
    }
}

module.exports = {
    unloaded,
    loaded,
    completed,
    getUnloadedRequests,
    getLoadedRequests
}

