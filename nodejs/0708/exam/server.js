const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const PORT = 8000;

// view engine
app.set('view engine', 'ejs')

// 정적파일세팅
app.use("/uploads", express.static(__dirname + '/uploads'));

// multer 설정
const storage = multer.diskStorage({
    destination: (req, file, done) => {
        done(null, 'uploads')
    },
    // 파일이름
    filename: (req, file, cb) => {
        // 확장자 추출
        const ext = path.extname(file.originalname)
        // 파일 이름 추출
        const newName = path.basename(file.originalname, ext) + Date.now() + ext;
        cb(null, newName);
    }
});
// 파일 용량제한
const limits = {
    fileSize: 1024 * 1024 * 5 //5mb
};
const upload = multer( { storage, limits });

// router
app.get('/', (req, res) => {
    res.render('index')
})

// 요청, 응답
app.post('/uploads/axios', upload.single('userfile'), (req, res) => {
    console.log('file', req.file); //single일때 files에 담길까? -> 안 담김 undefine뜸
    console.log('data', req.body);
    const {id, pw, username, age} = req.body
    res.json({filename: req.file.path, id, pw, username, age})
});


app.listen(PORT, () => {
console.log(`http://localhost:${PORT}`);    
})