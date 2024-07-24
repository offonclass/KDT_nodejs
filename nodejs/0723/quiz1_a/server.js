const http = require('http')
const express = require('express')
const socketIo = require('socket.io')
const app = express();
const PORT = 8000

// http서버
const server = http.createServer(app)
const io = socketIo(server);

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('client');
})
// 소켓 통신
io.on('connection', (socket) => {
    socket.on('hello', (arg) => {
        console.log('client :', arg.message);
        socket.emit('rtHello', {message: '안녕하세요'})
    })
    socket.on('study', (arg) => {
        console.log('client :', arg.message);
        socket.emit('rtStudy', {message: '공부합시다'})
    })
    socket.on('bye', (arg) => {
        console.log('client :', arg.message);
        socket.emit('rtBye', {message: '잘가'})
    })
})

server.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
})