const express = require('express')
const router = express.Router()
const {main, pageVisitor} = require('../controller/page')

// localhost:8000
router.get("/", main)

router.get('/visitor', pageVisitor)

router.get("/visitor/:id", pageVisitor);

module.exports = router;




