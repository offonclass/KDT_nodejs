const express = require('express')
const db = require('./models')
const app = express();
const PORT = 8000;

app.set('view engine', 'ejs');

app.use(express.json());

const pageRouter = require('./routes/page')
app.use('/', pageRouter);
const memberRouter = require('./routes/member')
app.use('/api/member', memberRouter);


//404
app.use('*', (req, res) => {
    res.render('404')
})




db.sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log(`http://localhost:${PORT}`);
    });
});