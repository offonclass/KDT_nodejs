const http = require('http')
const express = require('express');
const socketIo = require('socket.io')
const app = express();
const PORT = 8000;

const server = http.createServer(app);

const io = socketIo(server);

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('client')
});

io.on('connection', (socket) => {
    console.log('클라이언트 입장!');
    socket.on('hello', (arg) => {
        console.log('client :', arg);
        socket.emit('hello', 'hello: 안녕하세요')
    })
    socket.on('study', (arg) => {
        console.log('client :', arg);
        socket.emit('study', 'study: 공부합시다!')
    })
    socket.on('bye', (arg) => {
        console.log('client :', arg);
        socket.emit('bye', 'bye: 안녕히가세요!')
    })

})

server.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
})
