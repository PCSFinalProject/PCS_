const express = require('express');
const router = express.Router();

const shipAgencyController = require('../controllers/shipAgencyController');


router.post('/create/ship', shipAgencyController.createShip);
router.post('/request/entry', shipAgencyController.requestEntryShip);
router.post('/request/exit', shipAgencyController.requestExitShip);
router.get('/entry/requests/:shipAgencyId', shipAgencyController.getEntryRequests);
router.get('/exit/requests/:shipAgencyId', shipAgencyController.getExitRequests);

module.exports = router;