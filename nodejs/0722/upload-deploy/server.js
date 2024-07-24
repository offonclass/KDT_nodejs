require('dotenv').config();
const express = require('express');
const db = require('./models');
const app = express();
const PORT = 8000;


app.set('view engine', 'ejs');



//라우터
const router = require('./routes');
app.use('/', router);



db.sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log(`http://localhost:${PORT}`);
    });
});
