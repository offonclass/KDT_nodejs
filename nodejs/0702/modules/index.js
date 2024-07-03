const fs = require('fs');

// 파일 쓰기

fs.writeFile("file.txt", "Hello World", (err) => {
    if (err) throw err;
    console.log('저장 완료');
});

// 파일 읽기

fs.readFile("file.txt", "utf8", (err, data) => {
    if(err) throw err;
    console.log(data);
});

