const userModel = require('../model/user')


// 회원 등록(회원 가입)
const signUp = async (req, res) => {
    console.log('req', req.body);
    const { userid, pw, name } = req.body
    const data = await userModel.signUp(userid, pw, name)
    console.log('data', data);
    const result = {
        userid,
        pw,
        name
    }
    if(userid === "" || pw === "" || name === "") {
        result.result = false
    } else {
        result.result = true
        result.id = data.insertId
    }
    res.json(result);
};

// DB와 비교후 알맞은 페이지로 이동
const selectUser = async (req, res) => {
    console.log('req', req.body);
    const {userid, pw} = req.body;
    const [data] = await userModel.selectUser(userid, pw);
    console.log('cont', data);
    res.json(data);
}

// 전체 회원정보 조회
const allUser = async (req, res) => {
    const data = await userModel.allUser();
    console.log('cont', data);
    res.json({ result: data })
};


// 회원정보 하나 삭제
const deleteUser = async (req, res) => {
    console.log('req', req.body);
    const data = await userModel.deleteUser(req.body.id);
    if (data.affectedRows === 0) {
        res.json({ result: false })
    } else {
        res.json({ result: true })
    }

}


// 개인 회원정보 조회
const getUser = async (req, res) => {
    console.log(req.params.id);
    const [data] = await userModel.getUser(req.params.id);
    console.log('cont_data', data);
    res.json({ result: data })
}



// 회원정보 수정
const patchUser = async (req, res) => {
    console.log(req.body);
    const { userid, pw, name, id } = req.body;
    const data = await userModel.patchUser(userid, pw, name, id);
    if (data.affectedRows === 0) {
        res.json({ result: false })
    } else {
        res.json({ result: true })
    }
}



module.exports = { signUp, selectUser, allUser, deleteUser, getUser,  patchUser };