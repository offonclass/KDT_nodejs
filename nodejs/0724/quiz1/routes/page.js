const express = require('express')
const { login, signup, userMain, admin, submitBook, bookList, bookListUser, myRental, userList } = require('../controller/page')
const router = express.Router();


router.get('/', login)
router.get('/signup', signup)
router.get('/userMain', userMain)
router.get('/admin', admin)
router.get('/submitBook', submitBook)
router.get('/bookList', bookList)
router.get('/bookListUser', bookListUser)
router.get('/myRental', myRental)
router.get('/userList', userList)



module.exports = router;