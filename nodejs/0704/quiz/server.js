const express = require('express');
const app = express();
const PORT = 8000;


// view engine
app.set('view engine', 'ejs')

// router
app.get('/', (req,res) => {
    res.render('getAxios')
})


// axios
app.get('/axios', (req, res) => {
    console.log('요청값 : ', req.query);
    const { username, gender, birthYear, birthMonth, birthDay, interest } = req.query;
    // 응답
    const abc = {
        result: true,
        username,
        gender,
        birthYear,
        birthMonth,
        birthDay,
        interest
    };
    res.json(abc);
})








app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
})
