const express = require('express')
const { signup, login, info, updateFunc, deleteFunc } = require('../controller/member')
const router = express.Router();



router.post('/signup', signup);
router.post('/login', login);
router.get('/info', info);
router.patch('/update', updateFunc);
router.delete('/delete', deleteFunc);

module.exports = router;
