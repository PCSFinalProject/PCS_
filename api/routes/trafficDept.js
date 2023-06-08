const express = require('express');
const router = express.Router();
const trafficDeptController = require('../controllers/trafficDeptController');

router.post('/allotBerth', trafficDeptController.allotBerth);

router.post('/requestEmpty',trafficDeptController.requestEmptyBerth)