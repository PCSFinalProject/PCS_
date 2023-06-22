const express = require('express');
const router = express.Router();

const cargoHandlingController = require('../controllers/cargohandlingController');

const clientController = require('../controllers/clientController');
const {checkLogin} = require('../middleware/auth');
const clientValidator = require('../middleware/clientValidator');
const {validate} = require('../middleware/validate');
const credentials = require('../middleware/credentials');

router.post('/login',
    clientValidator.login,
    validate,
    clientController.login);

router.get('/getClientData',
    checkLogin,
    credentials.getWhoRegistered,
    clientController.getClientData);

router.post('/approve',
    checkLogin,
    credentials.getWhoRegistered,
    clientController.approve);

router.post('/remove',
    checkLogin,
    credentials.getWhoRegistered,
    clientController.remove);

router.get('/getApprovedFis',
    checkLogin,
    credentials.getWhoRegistered,
    clientController.getApprovedFis);

router.post('/unloaded', cargoHandlingController.unloaded);
router.post('/loaded', cargoHandlingController.loaded);
router.get('/unloadRequests/:portId', cargoHandlingController.getUnloadedRequests);
router.get('/loadRequests/:portId', cargoHandlingController.getLoadedRequests);
router.post('/updateStatus', cargoHandlingController.updateStatus);
router.get('/updateCargoStatus/:portId',cargoHandlingController.updateStatus)

module.exports = router;
