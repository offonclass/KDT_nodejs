const express = require('express');
const { main, uploadFunc } = require('../controller');
const router = express.Router();

//페이지
router.get('/', main);

//api
router.post('/upload', uploadFunc);

module.exports = router;
