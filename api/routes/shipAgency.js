const express = require('express');
const router = express.Router();

const shipAgencyController = require('../controllers/shipAgencyController');

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


router.post('/create/ship', shipAgencyController.createShip);
router.post('/request/entry', shipAgencyController.requestEntryShip);
router.post('/request/exit', shipAgencyController.requestExitShip);
router.get('/entry/requests/:shipAgencyId', shipAgencyController.getEntryRequests);
router.get('/exit/requests/:shipAgencyId', shipAgencyController.getExitRequests);

module.exports = router;