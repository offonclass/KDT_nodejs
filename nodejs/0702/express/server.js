const express = require('express');
const app = express();
const PORT = 8000;

// 뷰탬플릿
app.set("view engine", "ejs");
app.set("views", "./views"); //뷰파일들의 위치알려줌(명시적 경로)
// 뷰 파일을 views 폴더에 넣을때는 생략이 가능함.
// views폴더 외에 다른 폴더로 지정하고 싶을때는
// app.set("views", "./template") //이런식으로 생략하면 안됨

/* 
const path = require('path');
app.set('views', path.join(__dirname, 'template'))
 */

app.get("/", (req, res) => {
    res.send("Hello Express");
});

app.get('/test', (req, res) => {
    res.render('test' , {name: '홍길동'});
})

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});

