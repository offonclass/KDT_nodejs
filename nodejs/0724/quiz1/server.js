const express = require('express')
const app = express()
const PORT = 8000
const db = require('./models')


app.set('view engine', 'ejs')
app.use(express.json())

const pageRouter = require('./routes/page')
app.use('/', pageRouter)
const libraryRouter = require('./routes/library')
app.use('/api/library', libraryRouter)

db.sequelize.sync({force: false}).then(() => {
    app.listen(PORT, () => {
        console.log(`http://localhost:${PORT}`);
    })
})