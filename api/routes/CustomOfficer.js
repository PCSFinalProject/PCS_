const customOfficerController = require('../controllers/cutomOfficerController');


const router = require('express').Router();

router.get('/entryRequests/:portID', customOfficerController.getEntryRequests);

router.get('/exitRequests/:portID', customOfficerController.getExitRequests);

router.post('/approveEntry', customOfficerController.approveEntry);

router.post('/approveExit', customOfficerController.approveExit);

router.post('/rejectEntry', customOfficerController.rejectEntryShip);

router.post('/rejectExit', customOfficerController.rejectExitShip);


router.get('/ImportClearance/:portId', customOfficerController.getImportClearancePort);

router.get('/ExportClearance/:portId', customOfficerController.getImportClearancePort);

router.post('/approveImport', customOfficerController.acceptImportClearance);

router.post('/approveExport', customOfficerController.acceptExportClearance);

router.post('/rejectImport', customOfficerController.rejectImportClearance);

router.post('/rejectExport', customOfficerController.rejectExportClearance);

module.exports = router;