const express = require('express')
const { signup, login, submitBook, admin, bookList,
    deleteFunc, 
    bookListUser,
    rent,
    myRental,
    returnFunc,
    userList,
    showRentals} = require('../controller/library')
const { auth } = require('../middleware')
const router = express.Router()

// 회원가입 로그인
router.post('/signup', signup)
router.post('/login', login)

// 관리자 페이지
router.post('/submitBook', submitBook)
router.post('/admin', auth, admin)
router.post('/bookList', auth, bookList)
router.delete('/delete', auth, deleteFunc)
router.post('/userList', auth, userList)
router.post('/showRentals', showRentals)


// 사용자 페이지
router.post('/userMain', auth, (req, res) => {
    res.json({ result: true })
})
router.post('/bookListUser', auth, bookListUser)
router.post('/rent', auth, rent)
router.post('/myRental', auth, myRental)
router.post('/return', auth, returnFunc)


module.exports = router;