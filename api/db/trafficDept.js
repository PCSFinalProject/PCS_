const Ship = require('../models/ship');



const allocateBerth = async (shipId, berthId) => {
    try{
        const ship = Ship.findOneAndUpdate({shipId},{$set:{status:'DOCKED',berthId}},{new:true});
        
        return ship;
    }catch(err){
        console.log(err.message);
        throw err;
    }
    }

const requestEmptyBerth = async (shipId) => {
    try{
        const ship = Ship.findOneAndUpdate({shipId},{$set:{status:'REQUESTING EMPTY BERTH'}},{new:true});
      
       
        return ship;
    }
    catch(err){
        console.log(err.message);
        throw err;
    }
}

const getBerthRequests = async (portId) => {
    try{
        const ships = Ship.find({status:{$in: ["ENTRY ACCEPTED","PENDING"]},portId});
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





