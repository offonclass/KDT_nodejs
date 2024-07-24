const express = require('express')
const router = express.Router();
const { signup, login, profile, update, deleteFunc } = require('../controller/user');
const { auth } = require('../middleware');

router.post('/signup', signup)
router.post('/login', login)
router.post('/profile', auth, profile)
router.patch('/update', auth, update)
router.delete('/delete', auth, deleteFunc)

module.exports = router;