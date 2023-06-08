const express = require('express');
const router = express.Router();

const cargoHandlingController = require('../controllers/cargoHandlingController');

router.post('/unloaded', cargoHandlingController.unloaded);
router.post('/loaded', cargoHandlingController.loaded);
router.get('/unloadRequests/:portId', cargoHandlingController.getUnloadedRequests);
router.get('/loadRequests/:portId', cargoHandlingController.getLoadedRequests);


module.exports = router;
