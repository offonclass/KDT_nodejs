const express = require('express')
const app = express();
const PORT = 8000;

app.set('view engine','ejs')
app.set('views','./views')
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/getForm', (req, res) => {
    console.log(req.query);
    res.render('result', {title: 'get요청 결과', userInfo: req.query})
})
app.post('/postForm', (req, res) => {
    console.log(req.body);
    res.render('result', {title: 'post요청 결과', userInfo: req.body})
})

app.listen(PORT,() => {
    console.log(`http://localhost:${PORT}`);
})