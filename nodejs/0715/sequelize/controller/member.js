const { Member } = require('../models');

const signup = async (req, res) => {
    //req.body.userid, req.body.pw, req.body.username
    const { userid, pw, username } = req.body;
    //존재여부확인
    const find = await Member.findOne({ where: { userid } });

    if (find) {
        res.json({ result: false, message: '이미 존재하는 회원' });
    } else {
        const result = await Member.create({ userid, pw, username });
        res.json({ result: true, message: '회원가입완료' });
    }
};

const login = async (req, res) => {
    const { userid, pw } = req.body;
    //존재여부
    const find = await Member.findOne({ where: { userid } });
    console.log('find', find);
    if (find) {
        if (find.pw === pw) {
            const response = {
                id: find.id,
                userid: find.userid,
                username: find.username,
            };
            res.json({ result: true, code: 100, response, message: '로그인 성공' });
        } else {
            res.json({ result: false, code: 1000, response: null, message: '비밀번호 틀렸습니다.' });
        }
    } else {
        res.json({ result: false, code: 1001, response: null, message: '회원이 아닙니다.' });
    }
};

const info = async (req, res) => {
    //req.params.id
    const { id } = req.params;
    const { id: pkId, userid, username, pw } = await Member.findByPk(id);
    const response = {
        userid,
        username,
        id: pkId,
        pw,
    };
    res.json({ result: true, response });
};

const updateFunc = async (req, res) => {
    const { id, username, pw } = req.body;
    await Member.update({ username, pw }, { where: { id } });
    res.json({ result: true });
};

const deleteFunc = async (req, res) => {
    const { id } = req.body;
    await Member.destroy({ where: { id } });
    res.json({ result: true });
};

module.exports = { signup, login, info, updateFunc, deleteFunc };
