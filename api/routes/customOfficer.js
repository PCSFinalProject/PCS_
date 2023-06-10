
const customOfficerController = require('../controllers/cutomOfficerController');


const router = require('express').Router();

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


router.get('/entryRequests/:portID', customOfficerController.getEntryRequests);

router.get('/exitRequests/:portID', customOfficerController.getExitRequests);

router.post('/approveEntry', customOfficerController.approveEntry);

router.post('/approveExit', customOfficerController.approveExit);

router.post('/rejectEntry', customOfficerController.rejectEntryShip);

router.post('/rejectExit', customOfficerController.rejectExitShip);


router.get('/ImportClearance/:portId/:type', customOfficerController.getImportClearancePort);

router.get('/ExportClearance/:portId/:type', customOfficerController.getImportClearancePort);

router.post('/approveImport', customOfficerController.acceptImportClearance);

router.post('/approveExport', customOfficerController.acceptExportClearance);

router.post('/rejectImport', customOfficerController.rejectImportClearance);

router.post('/rejectExport', customOfficerController.rejectExportClearance);

module.exports = router;