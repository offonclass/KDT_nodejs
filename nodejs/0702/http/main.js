// const http = require('http')
import http from 'http';
import fs from 'fs';

const PORT = 8000;

const server = http.createServer((req, res) => {

    // 파일 전송
    fs.readFile("index.html", (err, data) => {
        
        if(err) {
            console.error(err);
            res.writeHead(404);
            res.end(err.message);
            return ;
        }


        res.writeHead(200);
        res.write(data);
        res.end('<div>END</div>');


    });
});

server.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});


