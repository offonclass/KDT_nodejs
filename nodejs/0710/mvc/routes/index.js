const express = require('express');
const controller = require('../controller/login')
const router = express.Router();



router.get('/', controller.main)

router.get('/comments', controller.comments);

// :변수값은 {변수명: "값"} 형태
router.get('/comment/:page', controller.comment);

module.exports = router;