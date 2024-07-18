const express = require('express')
const { login, signup, profile  } = require('../controller/page');
const router = express.Router();


router.get('/', login)
router.get('/signup', signup)
router.get('/profile', profile)

module.exports = router;