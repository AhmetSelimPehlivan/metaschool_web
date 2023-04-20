const { Router } = require('express');
const authController = require('../controller/authController');

const router = Router();

router.post('/signup', authController.signup_post);
router.get('/signup', authController.signup_get);
router.post('/login', authController.login_post);
router.get('/logout', authController.logout_get);

module.exports = router;