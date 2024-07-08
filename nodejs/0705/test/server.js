const express = require('express')
const multer = require('multer')
const path = require('path') //내장 객체? 내장 모듈? 자바스크립트 내
const app = express();
const PORT = 8000;

// body parser

/* 
app.use(express.urlencoded({ extended: true })) // jquery, ajax
app.use(express.json()) // axios, patch

 */

// multer


// view engine
app.set('view engine', 'ejs')
app.set('views', './views') //생략가능

// 정적파일 설정
// http://localhost:8000/uploads/파일명
app.use('abcd/', express.static(__dirname + '/uploads'))

// multer 세부설정
const uploadDetail = multer({
    // storage: 저장할 공간에 대한 정보
    // diskStorage: 파일을 저장하기 위한 모든 제어기능 제공(파일 저장관련 설정)
    storage: multer.diskStorage({

        // destination :업로드한 파일을 저장할 폴더 지정
        destination(req, file, done) {
            done(null, 'uploads/') // done(오류처리, 저장폴더)
        },

        // filename : 파일 이름 결정(요청객체, 업로드된 파일객체, 콜백함수)
        filename(req, file, done) {
            // 확장자 추출
            const ext = path.extname( file.originalname)
            // ext == '.png'
            // 파일이름 추출
            const newName = path.basename(file.originalname, ext) + Date.now() + ext;
            // asdf + 1701293730842894 + .png
            done(null, newName);
        }
    }),
    // limits: 파일 용량 제한
    limits: {fileSize: 1024 * 1024 * 5}, //5mb제한
})

// router
app.get('/',(req, res) => {
    res.render('index')
})


// 요청, 응답
app.post('/upload', uploadDetail.array('userfile'), (req, res) => {
    console.log('file', req.file);
    console.log('body', req.body);
})


app.post("/upload/axios", uploadDetail.single('userfile1'), (req, res) => {
    console.log('file', req.file, 'title', req.body);
    res.json( { file1: req.file, title1: req.body } )
})


app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
})




