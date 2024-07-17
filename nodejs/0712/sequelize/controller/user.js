const userModel = require('../model/user');
const { User } = require('../models')

//회원가입
const signup = async (req, res) => {
    console.log('요청값:', req.body);
    const { userid, name, pw } = req.body;
    // const result = await userModel.signup(userid, name, pw);
    const result = await User.create({userid, name , pw}) //User.create -> INSERT
    res.json({ result: true });
};
//로그인
const login = async (req, res) => {
    console.log('요청값:', req.body);
    const { userid, pw } = req.body;
    // const result = await userModel.login(userid, pw);
    const result = await User.findOne({ where: {userid, pw} }) //findOne -> SELECT
    console.log('login', result);
    if (result != null) {
        res.json({ result: true, message: '로그인 성공', id: result.id });
    } else {
        res.json({ result: false, message: '로그인 실패', id: null });
    }
};
//회원정보 한명 조회
const info = async (req, res) => {
    console.log('요청값', req.params.id);
    // const result = await userModel.info(req.params.id);
    const result = await User.findOne({ where: {id: req.params.id} }) //
    if (result != null) {
        res.json({ result: true, info: result, message: '조회완료' });
    } else {
        res.json({ result: false, info: null, message: '존재하는 회원없음' });
    }
};
//회원정보 수정
const update = async (req, res) => {
    console.log('요청값', req.body);
    const { id, name, pw } = req.body;
    // const result = await userModel.update(id, name, pw);
    const result = await User.update({ name, pw }, {where: {id} }); //update -> UPDATE
    res.json({ result: true });
};

//회원정보 삭제
const deleteFunc = async (req, res) => {
    console.log('요청값', req.body);
    // const result = await userModel.deleteFunc(req.body.id);
    const result = await User.destroy({ where: {id: req.body.id} }) //destroy -> DELETE
    res.json({ result: true });
};
//회원 전체 정보
const all = async (req, res) => {
    // const result = await userModel.all();
    const result = await User.findAll({
        // attributes: 원하는 컬럼 조회(배열 형태)
        attributes: ['id', 'name', 'userid']

    })
    console.log(result);
    res.json({ result });
};

module.exports = { signup, login, info, update, deleteFunc, all };
