const http = require('http')
const express = require('express');
const socketIo = require('socket.io')
const app = express()
const PORT = 8000

const server = http.createServer(app)

const io = socketIo(server);

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('client');
});

app.get('/chat', (req, res) => {
    res.render('chat');
})

// 소켓 채팅 예제
io.on('connection', (socket) => {
    console.log('조인 전', socket.rooms);
    socket.on('join', (arg) => {
        // 채팅방을 생성하는 방법은 .join(방 아이디)사용
        // 방이 존재하면 그 방으로 접속, 없으면 생성
        socket.join(arg)
        // 소켓 객체에 값 넣기
        socket.chatRoom = arg;
        console.log('조인 후', socket.rooms);
        // broadcast는 나를 제외한 전체 사용자(브라우저)에게 메세지를 전달
        socket.broadcast.to(arg).emit('create', '새로운 브라우저가 입장하였습니다.');

    })

    socket.on('message', (arg) => {
        const { user, message } = arg;
        // io.to('특정방 아이디').emit(이벤트) 특정방의 전체 사용자에게 이벤트를 전달
        io.to(socket.chatRoom).emit('chat', `${user}: ${message}`);
    })
})


// 소켓 기본 예제

/* 
io.on('connection', (socket) => {
    console.log(socket);
    socket.on('open_message', (arg1, arg2, cb) => {
        console.log('hi', arg1, arg2);
        cb('백엔드에서 보내는 메세지', 1000)
    })

    socket.on('form_message', (arg) => {
        console.log('arg!!', arg);
        socket.emit("backend_message", arg)
    })
})

 */

server.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
})