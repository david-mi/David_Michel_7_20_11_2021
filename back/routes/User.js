const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const validPw = require('../middlewares/validPassword');
const registerValid = require('../middlewares/registerValid');
const userIdCompare = require('../middlewares/userIdCompare');
const userCtrl = require('../controllers/User');
const multer = require('../middlewares/multer');

router.get('/users/:id', userCtrl.showProfile);
router.post('/signup', registerValid, userCtrl.signup);
router.post('/login', userCtrl.login);
router.put('/users/:id', auth, userIdCompare, multer, userCtrl.updateProfile);

module.exports = router;