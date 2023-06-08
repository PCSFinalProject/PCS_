const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const networkConnection = require('../utils/networkConnection');
const Ship = require('../models/ship');


const createShip = async (name, country, captain, capacity, type, cargo) => {
    try {
      const   shipId = UUID.v4();
        // const ship = await networkConnection.createShip(shipId, name, country, captain, capacity, type, cargo);
        const ship = await Ship.create({shipId, name, country, captain, capacity, type, cargo});

        return ship;
    } catch (err) {
        throw err;
    }
}

const requestEntryShip = async (shipId, portId) => {
    try {
        // const ship = await networkConnection.requestEntryShip(shipId, portId);
        const ship = await Ship.requestEntryShip(shipId, portId);
        return ship;
    } catch (err) {
        throw err;
    }
}

const requestExitShip = async (shipId, portId) => {
    try {
        // const ship = await networkConnection.requestExitShip(shipId, portId);
        const ship = await Ship.requestExitShip(shipId, portId);
        return ship;
    } catch (err) {
        throw err;
    }
}
const getEntryRequests = async (shipAgencyId) => {
    try {
        // const ships = await networkConnection.getEntryRequests(shipAgencyId);
        const ships = await Ship.getEntryRequests(shipAgencyId);
        return ships;
    } catch (err) {
        throw err;
    }
}

const getExitRequests = async (shipAgencyId) => {
    try {
        // const ships = await networkConnection.getExitRequests(shipAgencyId);
        const ships = await Ship.getExitRequests(shipAgencyId);
        return ships;
    } catch (err) {
        throw err;
    }
}
const getShips = async (shipAgencyId) => {
    try {
        // const ships = await networkConnection.getShips(shipAgencyId);
        const ships = await Ship.getShips(shipAgencyId);
        return ships;
    } catch (err) {
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
