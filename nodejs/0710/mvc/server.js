const express = require('express')
const app = express();
const PORT = 8000;

app.set('view engine', 'ejs')




const commentRouter = require('./routes/index.js')
// const commentRouter = require('./routes/index')
// const commentRouter = require('./routes')
app.use('/', commentRouter)

const userRouter = require('./routes/user')
app.use('/user', userRouter)

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
})