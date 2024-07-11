const express = require('express');
const router = express.Router();

const controller = require('../controller/user');

//localhost:8000/api/user
//POST /signup 회원가입
router.post('/signup', );
//POST /login  로그인
router.post('/login', );
//GET /info 회원정보
router.get('/info/:id', );
//PATCH /update 회원수정
router.patch('/update', );
//DELETE /delete 회원삭제
router.delete('/delete', );

//GET /all 회원전체정보
router.get('/all', );

module.exports = router;