const Ship = require('../models/ship');



const allocateBerth = async (shipId, berthId) => {
    try{
        const ship = Ship.findOne({shipId});
        if(!ship){
            throw new Error('Ship not found');
        }
        ship.berthId = berthId;
        ship.status = 'DOCKED';
        await ship.save();
        return ship;
    }catch(err){
        console.log(err.message);
        throw err;
    }
    }

const requestEmptyBerth = async (shipId, berthId) => {
    try{
        const ship = Ship.findOne({shipId});
        if(!ship){
            throw new Error('Ship not found');
        }
        ship.berthId = berthId;
        ship.status = 'REQUESTING EMPTY BERTH';
        await ship.save();
        return ship;
    }
    catch(err){
        console.log(err.message);
        throw err;
    }
}

const getBerthRequests = async (portId) => {
    try{
        const ships = Ship.find({status:'REQUEST ENTRY',portId});
        return ships;
    }catch(err){
        console.log(err.message);
        throw err;
    }
}


const getBerthAlllocated = async (portId) => {
    try{
        const ships = Ship.find({status:{$in: ['DOCKED','UNLOADED','COMPLETED']},portId});
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





