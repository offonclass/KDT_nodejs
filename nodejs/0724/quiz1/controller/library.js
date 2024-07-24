const { User, Rental, Book } = require('../models');
const jwt = require('jsonwebtoken')

const signup = async (req, res) => {
    try {
        console.log(req.body);
        const { userName, pw, email } = req.body;
        if (userName === '' || pw === '' || email === '') {
            res.json({ result: false, message: '입력사항 누락' })
            return;
        }
        const findEmail = await User.findOne({ where: { email } })
        if (findEmail) {
            res.json({ result: false, message: '이메일 중복' })
        } else {
            const result = await User.create({ userName, password: pw, email })
            res.json({ result: true, message: '회원가입 성공' })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ result: false, message: '서버오류' })
    }
}

const login = async (req, res) => {
    try {
        const { email, pw } = req.body
        const result = await User.findOne({ where: { email } })
        // console.log(result.password);
        if (!result) {
            res.json({ result: false, message: '회원정보 없음' })
            return;
        }

        if (pw === result.password) {
            const token = jwt.sign({ id: result.id, email }, process.env.SECRET, { expiresIn: '24h' })
            res.json({ result: true, message: '로그인 성공', email, token })
        } else {
            res.json({ reuslt: false, message: 'pw오류' })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ result: false, message: '서버오류' })
    }
}


// 관리자
const submitBook = async (req, res) => {
    try {
        console.log(req.body);
        const { bookName, author, publishDate } = req.body;
        const findOne = await Book.findOne({ where: { bookName } })
        if (findOne) {
            res.json({ result: false, message: '도서 제목 중복' })
        } else {
            const result = await Book.create({ bookName, author, publishDate })
            res.json({ result: true, message: '등록 성공' })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ result: false, message: '서버오류' })
    }
}

const admin = (req, res) => {
    const { id, email } = req.userInfo;
    if (email === 'admin@admin.com') {
        res.json({ result: true })
    } else {
        res.json({ result: false })
    }
}

const bookList = async (req, res) => {
    const { id, email } = req.userInfo;
    if (email === 'admin@admin.com') {
        const findAll = await Book.findAll({
            attributes: ['id', 'bookName', 'author', 'publishDate', 'exist']
        })
        // console.log('전체 도서목록!!', findAll);
        res.json({ result: true, bookList: findAll })
    } else {
        res.json({ result: false })
    }
}

const deleteFunc = async (req, res) => {
    const { id, email } = req.userInfo;
    // console.log('req!!', req.body);
    if (email === 'admin@admin.com') {
        const result = await Book.destroy({ where: { id: req.body.id } })
        res.json({ result: true, message: '삭제 완료' })
    } else {
        res.json({ result: false })
    }
}

const userList = async (req, res) => {
    const { id, email } = req.userInfo;
    if (email === 'admin@admin.com') {
        const findAll = await User.findAll()
        // console.log('전체 사용자 목록!!', findAll);
        res.json({ result: true, userList: findAll })
    } else {
        res.json({ result: false })
    }
}
const showRentals = async (req, res) => {
    const userId = req.body.id
    const findUser = await User.findOne({where: {id: userId}})
    const findRentals = await Rental.findAll({where: {userId}})
    res.json({result: true, rentalList: findRentals, userName: findUser.userName})
}


// 사용자

const bookListUser = async (req, res) => {
    const findAll = await Book.findAll({
        attributes: ['id', 'bookName', 'author', 'publishDate', 'exist']
    })
    // console.log('전체 도서목록!!', findAll);
    res.json({ result: true, bookList: findAll })
}

function changeTimestamp(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

const rent = async (req, res) => {
    const rentBookId = req.body.id
    const rentResult = await Book.update({ exist: false }, { where: { id: rentBookId } })


    const findUser = await User.findOne({ where: req.userInfo.id })
    const findBook = await Book.findOne({ where: rentBookId })
    // console.log('책정보 가져오기!', findBook);
    const nowDate = changeTimestamp(Date.now())
    const returnDate = changeTimestamp(Date.now() + 604800000)
    const addRentalResult = await Rental.create({
        userName: findUser.userName, bookName: findBook.bookName,
        rentalDate: nowDate, returnDate, userId: findUser.id, bookId: findBook.id
    });

    res.json({ result: true, message: '대여 성공' })
}

const myRental = async (req, res) => {
    const userId = req.userInfo.id
    // const findUser = await User.findOne({where: {id: userId}})
    const findRentals = await Rental.findAll({where: {userId}})
    res.json({result: true, rentalList: findRentals})
}

const returnFunc = async (req, res) => {
    const rentalId = req.body.id;
    const findRental = await Rental.findOne({where: {id: rentalId}})
    const bookId = findRental.bookId
    const deleteRental = await Rental.destroy({where: {id: rentalId}})
    console.log('returnFunc의 rentalId', rentalId);
    console.log('returnFunc의 bookId', bookId);
    if(deleteRental) {
        const updateBook = await Book.update({exist: true},{where: {id: bookId}})
        if(updateBook) {
            res.json({result: true, message: '반납 성공'})
        } else {
            res.json({result:false, message: '도서 재고정보 업데이트 실패'})
        }
    } else {
        res.json({result: false, message: '대여 정보 삭제 실패'})
    }
}

module.exports = { signup, login, submitBook, admin, bookList, deleteFunc, bookListUser, rent, myRental, returnFunc, userList, showRentals }