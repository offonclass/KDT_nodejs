require('dotenv').config()
const mysql = require('mysql2/promise'); 

// mySQL연결
const getConn = async () => {
    return await mysql.createConnection({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASS,
        database: process.env.DATA
    })
}

// 회원정보 INSERT
const signUp = async (userid, pw, name) => {
    if(userid === "" || pw === "" || name === "") {
        return;
    }
    const conn = await getConn();
    const query = 'INSERT INTO user (userid, pw, name) VALUES (?, ?, ?)'
    const [result] = await conn.query(query, [userid, pw, name])
    console.log('model_result', result);
    await conn.end();
    return result;
}

// db와 비교후 id 추출
const selectUser = async (userid, pw) => {
    const conn = await getConn();
    const query = 'SELECT * FROM user WHERE userid = ? and pw = ?'
    const [result] = await conn.query(query, [userid, pw])
    console.log('model_result', result);
    await conn.end();
    return result;
}


const allUser = async () => {
    const conn = await getConn(); 
    const query = 'SELECT * FROM user';
    
    const [row] = await conn.query(query);
    console.log('model', row);
    await conn.end();
    return row;
}

const deleteUser = async (id) => {
    const conn = await getConn();
    const query = 'delete from user where id = ?'
    const [result] = await conn.query(query, [id])
    console.log('result', result);
    await conn.end();
    return result;
}


const getUser = async (id) => {
    const conn = await getConn();

    const query = 'select * from user where id = ?';
    const [row] = await conn.query(query, [id]);
    console.log('model_row', row);

    await conn.end();
    return row;
}



const patchUser = async (userid, pw, name, id) => {
    const conn = await getConn();
    const query = 'update user set userid = ?, pw = ?, name = ? where id = ?'
    const [result] = await conn.query(query, [userid, pw, name, id])
    console.log('result', result);
    await conn.end()
    return result;
}




module.exports={ signUp, selectUser, allUser, deleteUser, getUser,  patchUser }