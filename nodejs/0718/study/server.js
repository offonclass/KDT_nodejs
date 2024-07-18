const express = require('express')
const app = express();
const PORT = 8000;
const db = require('./models')


//세팅
app.set('view engine', 'ejs')
app.use(express.json());

//라우터
const pageRouter = require('./routes/page')
app.use('/', pageRouter)
// const userRouter = require('./routes/user')
// app.use('/api/user',userRouter)

db.sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log(`http://localhost:${PORT}`);
    })

})



