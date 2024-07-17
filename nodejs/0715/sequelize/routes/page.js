const express = require('express');
const { main, post, detail, write, signup, login, profile } = require('../controller/page');
const router = express.Router();

router.get('/', main);
router.get('/post', post);
router.get('/post/:id', detail);
router.get('/write', write);
router.get('/signup', signup);
router.get('/login', login);
router.get('/profile', profile);

module.exports = router;
