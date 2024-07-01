const express = require('express');
const userController = require('../controllers/user-controller');
const router = express.Router();

router.post('/register', userController.register);
router.put('/login', userController.login);
router.get('/get/:id', userController.get);
router.delete('/delete/:id', userController.delete);

module.exports = router;