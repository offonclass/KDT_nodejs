const express = require('express');
const app = express();
const PORT = 8000;

// body-parser
app.use(express.urlencoded({ extended: true}));
// view engine
app.set('view engine', 'ejs')

// router
app.get('/', (req,res) => {
    res.render('index')
})

app.get('/getPage', (req, res) => {
    res.render('get')
})

app.get("/resultGet", (req, res) => {
    console.log(req.query);
    const {username, gender, year, month, day, interest} = req.query
    res.render('result', {title: 'GET 전송 결과',userInfo: {
        username, gender, year, month, day, interest,
        color: {result: false, color: null},
        number: {result: false, number: null}
    }})
})

// post전송
app.get('/postPage', (req, res) => {
    res.render('post')
})

app.post('/resultPost', (req, res) => {
    console.log(req.body);
    const {username, gender, year, month, day, 
        interest, color, number} = req.body;

    res.render('result', {title: 'GET 전송 결과',userInfo: {
        username, gender, year, month, day, interest, 
        color: {result: true, color: color},
        number: {result: true, number: number}
    }})
})





app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
})
