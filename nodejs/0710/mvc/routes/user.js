const express = require('express')
const { user } = require('../controller/user')
const router = express.Router();

router.get('/', user);

// //localhost:8000/user/info
// router.get('/info')

module.exports = router;