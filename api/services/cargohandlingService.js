const Ship = require('../models/ship');

const unloaded = async (shipId) => {
    try{
        const ship = await Ship.findOneAndUpdate({shipId},{$set:{status:'UNLOADING'}},{new:true});
       
        return ship;
    }catch(err){
        console.log(err.message);
        throw err;
    }
}

const loaded = async (shipId) => {
    try{
        const ship = await Ship.findOneAndUpdate({shipId},{$set:{status:'LOADING'}},{new:true});
       
        return ship;
    }catch(err){
        console.log(err.message);
        throw err;
    }
}

const completed = async (shipId) => {
    try{
        const ship = await Ship.findOneAndUpdate({shipId},{$set:{status:'COMPLETED'}},{new:true});
       
        return ship;
    }catch(err){
        console.log(err.message);
        throw err;
    }
}
const getUpadateSatatus = async (portId) => {
    try{
        const ships = await Ship.find({status: {$in :['UNLOADING','LOADING']}, portId});
        return ships;
    }catch(err){
        console.log(err.message);
        throw err;
    }
}

const getUnloadedRequests = async (portId) => {
    try{
        const ships = await Ship.find({status: 'REQUEST UNLOADING', portId});
        return ships;
    }catch(err){
        console.log(err.message);
        throw err;
    }
}

const getLoadedRequests = async (portId) => {
    try{
        const ships = await Ship.find({status: 'REQUEST LOADING', portId});
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
    getLoadedRequests,
    completed
}

