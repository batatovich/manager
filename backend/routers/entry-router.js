const express = require('express');
const entryController = require('../controllers/entry-controller');
const router = express.Router();

router.post('/save', entryController.saveEntry);
router.get('/get/:id', entryController.getEntry);
router.delete('/delete/:id', entryController.deleteEntry);
router.put('/edit', entryController.editEntry);
router.get('/all', entryController.getAllEntries);

module.exports = router;