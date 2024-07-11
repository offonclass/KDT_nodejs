const express = require('express');
const router = express.Router();

const pageController = require('../controller/page')

router.get('/', pageController.main)
router.get('/admin', pageController.admin)
router.get('/info/:id', pageController.userInfo)
router.get('/signup', pageController.signUp)

module.exports = router;
