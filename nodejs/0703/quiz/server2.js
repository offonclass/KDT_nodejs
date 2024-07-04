const express = require('express')
const app = express();
const PORT = 8000;

app.set('view engine','ejs')
app.set('views','./views')
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.render('index2')
})

app.post('/postForm', (req, res) => {
    console.log(req.body);
    res.render('result2', {title: 'post요청 결과', userInfo: req.body})
})

app.listen(PORT,() => {
    console.log(`http://localhost:${PORT}`);
})