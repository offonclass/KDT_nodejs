const express = require('express');
const router = express.Router();

const controller = require('../controller/user');

//localhost:8000/api/user
//POST /signup 회원가입
router.post('/signup', controller.signUp);
//POST /login  로그인
router.post('/login', controller.selectUser);
//GET /info 회원정보
router.get('/info/:id', controller.getUser);
//PATCH /update 회원수정
router.patch('/update', controller.patchUser);
//DELETE /delete 회원삭제
router.delete('/delete', controller.deleteUser);

//GET /all 회원전체정보
router.get('/all', controller.allUser);

module.exports = router;