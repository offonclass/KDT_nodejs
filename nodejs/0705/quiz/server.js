const express = require('express')
const multer = require('multer')
const path = require('path')
const app = express();
const PORT = 8000;

app.set('view engine', 'ejs')
app.use('/uploads', express.static(__dirname + '/uploads'))

// multer
const uploadDetail = multer({
    storage: multer.diskStorage({

        destination(req, file, done) {
            done(null, 'uploads/')

        },
        filename(req, file, done){
            const ext = path.extname(file.originalname)
            const newName = path.basename(file.originalname, ext) + Date.now() + ext;
            done(null, newName);

        }
    }),
    limits: {fileSize: 1024 * 1024 * 5}
})

// router
app.get('/', (req, res) => {
    res.render('index')
})