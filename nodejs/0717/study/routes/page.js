const express = require('express')
const router = express.Router()
const { main, signup, login, profile } = require('../controller/page')



router.get('/', main);
router.get('/signup', signup);
router.get('/login', login);
router.get('/profile', profile);
module.exports = router;