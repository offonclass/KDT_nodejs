const express = require('express');
const controller = require('../controller/page');
const router = express.Router();

router.get('/', controller.main);
router.get('/login', controller.login);
router.get('/signup', controller.signup);
router.get('/profile/:id', controller.profile);

module.exports = router;
