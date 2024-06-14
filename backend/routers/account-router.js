const express = require('express');
const accountController = require('../controllers/account-controller');
const router = express.Router();

router.post('/save', accountController.saveAccount);
router.get('/get/:id', accountController.getAccount);
router.delete('/delete/:id', accountController.deleteAccount);
router.put('/edit', accountController.editAccount);
router.get('/all', accountController.getAllAccounts);

module.exports = router;