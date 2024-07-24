const http = require('http')
const express = require('express')
const socketIo = require('socket.io');
const { log } = require('console');
const app = express();
const PORT = 8000;

const server = http.createServer(app);
const io = socketIo(server);


app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('client')
});

const roomList = [];
const userList = [];

io.on('connection', (socket) => {
    // socket 변수는 접속한 브라우저들(구글 탭)
    io.emit('roomList', roomList)
    // 웹브라우저가 접속되면 고유한 id값이 생성됨 -> socket.id
    console.log(socket.id);
    socket.on('create', (arg) => {
        console.log(arg.roomName);
        // join(방이름) : 없으면 생성, 있으면 입장
        socket.join(arg.roomName)

        // 나를 제외한 모든사람에게

        socket.roomName = arg.roomName
        socket.userName = arg.userName

        // 채팅방 목록 갱신
        if (!roomList.includes(arg.roomName)) {
            roomList.push(arg.roomName)
            // 갱신 됐을 때 목록을 클라이언트로 전달, 전체가 봐야함
            // io.emit('roomList', roomList)
        }
        io.to(arg.roomName).emit('notice', `${socket.userName}님이 입장 하셨습니다.`)

        const roomUserList = [];
        const roomIdList = [];
        // userInfo = [방 이름, 유저 이름, 아이디]
        userInfo = [socket.roomName, socket.userName, socket.id]
        userList.push(userInfo)
        userList.forEach((userInfo) => {
            if (arg.roomName === userInfo[0]) {
                roomUserList.push(userInfo[1])
                roomIdList.push(userInfo[2])
            }
        })

        io.to(arg.roomName).emit('userList', { roomUserList, roomIdList })
        io.to(socket.id).emit('myId', socket.id)
    })


    socket.on('sendMessage', (arg) => {
        const { id, message } = arg;
        console.log('id전송 확인!!!', id);
        if(id === 'all') {
            io.to(socket.roomName).emit('newMessage', { message, userName: socket.userName, id: socket.id })
        } else {
            io.to(id).emit('secretMessage', { message, userName: socket.userName, id: socket.id })
            io.to(socket.id).emit('secretMessage', { message, userName: socket.userName, id: socket.id })
        }
    })



})

server.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
})
