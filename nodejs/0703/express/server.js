const express = require('express')
const app = express();
const PORT = 8000;

// 뷰 탬플릿
app.set("view engine", 'ejs');
app.set("views", './views');

// 정적 파일 세팅 
app.use("/abc", express.static(__dirname + '/public'));

// 시간값 출력
app.use((req, res, next) => {
    console.log('time: ', Date.now());
    next();
})

// 라우터
// "/"는 http://localhost:8000
app.get('/', (req, res) => {
    res.send({ name: "KDT 13기" });
});

// "/kdt" 는 http://localhost:8000/kdt
app.get("/kdt", (req, res) => {
    // render() : 뷰 탬플릿 렌더링, 템플릿 이름과 렌더링 이름 동일해야함
    res.render("test", { age: 20 });
});


app.get("/gugu", (req, res) => {
    res.render("gugudan", { dan: 3, leng: [1, 2, 3, 4, 5, 6, 7, 8, 9] })
})

app.get("/fruit", (req, res) => {
    res.render("fruit", {
        fruit: [
            { name: 'apple', kor: '사과' },
            { name: 'banana', kor: '바나나' },
            { name: 'grapes', kor: '포도' },
            { name: 'peache', kor: '복숭아' }
        ]
    })
})


app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
})



