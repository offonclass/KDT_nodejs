const express = require('express')
const app = express();
const PORT = 8000

//body-parser
app.use(express.json())
// view engine
app.set('view engine', 'ejs')



const loginRouter = require('./routes/index.js')
// const commentRouter = require('./routes/index')
// const commentRouter = require('./routes')
app.use('/', loginRouter)


app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
})