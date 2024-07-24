const http = require('http');
const express = require('express');
const socketIo = require('socket.io');
const app = express();
const PORT = 8000;

app.set('view engine', 'ejs');

const server = http.createServer(app);
const io = socketIo(server);

app.get('/', (req, res) => {
    res.render('client');
});


function getUserList(room) {
    // room에 접속한 모든 사용자
    const users = [];
    console.log(io.sockets);
    // 채팅룸에 접속한 socket.id값을 찾음
    const clients = io.sockets.adapter.rooms.get(room);
    console.log(clients);
    if( clients ) {
        clients.forEach((client) => {
            console.log('client : ', client);
            // io.sockets.socket -> socket.id가 할당한 변수들의 객체 값
            const userSocket = io.sockets.sockets.get(client)
            const info = { userName: userSocket.userName, key: client}
            users.push(info)
        })
    }
    return users;
}

const roomList = [];
io.on('connection', (socket) => {
    //socket변수는 접속한 브라우저들(구글탭)
    io.emit('roomList', roomList);
    //웹브라우저가 접속이되면 고유한 id값이 생성됨. socket.id
    socket.on('create', (arg) => {
        //console.log(arg.roomName);
        //join(방이름): 없으면생성. 있으면입장
        socket.join(arg.roomName);
        //socket객체안에 원하는 값을 할당
        socket.roomName = arg.roomName;
        socket.userName = arg.userName;
        //나를 제외한 모든 방사람들에게 메세지 전달
        socket.to(arg.roomName).emit('notice', `${socket.id}님이 입장하셨습니다.`);

        //채팅방 목록 갱신
        if (!roomList.includes(arg.roomName)) {
            roomList.push(arg.roomName);
            //갱신됐을때 목록을 클라이언트로 전달, 전체가 봐야함
            //io.emit('roomList', roomList);
        }
        // 사용자 정보 갱신
        const userList = getUserList(arg.roomName)
        io.to(arg.roomName).emit('userList', userList)
    });
    socket.on('sendMessage', (arg) => {
        const { message, user, select } = arg;
        if( select === 'all') {
            // io.to(방id) 나를 포함한 방id에 있는 모든 사람에게 메세지 보내기
            io.to(socket.roomName).emit('newMessage', { message, user, dm: false });
        } else {
            io.to(select).emit('newMessage', { message, user, dm: true });

            // 자기 자신에게 메세지 보내기
            socket.emit('newMessage', {message, user, dm: true})
        }
    });
});

server.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
