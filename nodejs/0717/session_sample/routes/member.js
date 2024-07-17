const express = require('express');
const {signup, login, find, update, deleteFunc } = require('../controller/member');
const router = express.Router();

router.post('/signup', signup)
router.post('/login', login)
router.get('/info', find)
router.patch('/update', update)
router.delete('/delete', deleteFunc)

module.exports = router;

