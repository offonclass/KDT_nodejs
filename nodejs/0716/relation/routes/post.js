const express = require('express');
const { createPost, createComment, all, getPost } = require('../controller/post');
const router = express.Router();

// 글 생성
router.post('/create', createPost)
// 댓글 생성
router.post('/comment', createComment)
// 전체 조회
router.get('/all', all)
//하나 조회
router.get('/getPost/:id', getPost)

module.exports = router;
