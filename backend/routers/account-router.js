const express = require('express');
const accountController = require('../controllers/account-controller');
const authenticateJWT = require('../middlewares/authenticateJWT'); 
const router = express.Router();

router.use(authenticateJWT); //Authentication middleware

router.post('/save', accountController.saveAccount);
router.get('/get/:id', accountController.getAccount);
router.delete('/delete/:id', accountController.deleteAccount);
router.put('/edit', accountController.editAccount);
router.get('/all', accountController.getAllAccounts);

module.exports = router;