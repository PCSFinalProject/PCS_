const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');

const networkConnection = require('../utils/networkConnection');
const Ship = require('../db/ship');
let idvalue=Math.random();

const createShip = async (name, country, captain, capacity, type, cargo,shipAgencyId) => {
    try {
      const   shipId = uuid.v4();
        // const ship = await networkConnection.createShip(shipId, name, country, captain, capacity, type, cargo);
        const ship = await Ship.createShip(shipId, name, country, captain, capacity, type, cargo,shipAgencyId);

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

const requestExitShip = async (shipId, shipAgencyId) => {
    try {
        // const ship = await networkConnection.requestExitShip(shipId, portId);
        const ship = await Ship.requestExitShip(shipId, shipAgencyId);
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
