const express = require('express')
const { main, login, profile, signup } = require('../controller/page')
const router = express.Router();

router.get('/', main)
router.get('/login', login)
router.get('/profile', profile)
router.get('/signup', signup)

module.exports = router;