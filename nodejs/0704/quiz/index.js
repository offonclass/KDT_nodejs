const express = require('express')
const app = express();
const PORT = 8000;
const trueId = 'testid'
const truePassword = 'qwer1234'

// body-parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// view engine
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index')
})

app.post('/axios', (req, res) => {
    console.log('요청값 : ',req.body);
    const { id, password } = req.body
    const data = {
        id,
        password
    }
    if (trueId === id & truePassword === password) {
        data.result = true
    } else {
        data.result = false
    }

    res.json(data)

})



app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
})

