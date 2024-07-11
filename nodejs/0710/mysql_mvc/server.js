const express = require('express');
const app = express();
const PORT = 8000;
const visitorRouter = require('./routes/visitor')

// 세팅
app.set('view engine', 'ejs');
app.use(express.json());



// router
const pageRouter = require('./routes/page')
app.use('/', pageRouter)


app.use('/api/visitor', visitorRouter)




//404
app.use('*', (req, res) => {
    res.status(404).render('404');
});


app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});

