const express = require('express');
const controller = require('../controller/login')
const router = express.Router();


// router
router.get('/', controller.main)
router.get('/get', controller.get)
router.get('/resultGet', controller.getLogin)
router.get('/post', controller.post)
router.post('/resultPost', controller.postLogin)



module.exports = router;