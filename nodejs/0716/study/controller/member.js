const { Member } = require('../models')

const signup = async (req, res) => {
    console.log(req.body);
    const {userid, pw, name} = req.body;
    const find = await Member.findOne({where: {userid}})
    if(find) {
        res.json({result:false, message:'아이디가 중복됩니다.'})
    } else {
        const result = await Member.create({userid, pw, username: name})
        res.json({result: true, message:'회원가입 성공'})
    }
}
const login = async (req, res) => {
    // console.log(req.body);
    const {userid, pw} = req.body;
    const find = await Member.findOne({ where: {userid}})
    // console.log('find', find);
    if(find) {
        if(find.pw === pw) {
            res.json({result:true, message:'로그인 성공', id: find.id})
        } else {
            res.json({result:false, message:'비밀번호 오류'})
        }
    } else {
        res.json({result: false, message: '아이디가 존재하지 않습니다.'})
    }
}

const info = async (req, res) => {
    //req.params.id
    // console.log('req!! : ', req.params);
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
    console.log('req!!',req.body);
    const { id, name, pw } = req.body;
    await Member.update({ username: name, pw }, { where: { id } });
    res.json({ result: true });
};

const deleteFunc = async (req, res) => {
    const { id } = req.body;
    await Member.destroy({ where: { id } });
    res.json({ result: true });
};

module.exports = { signup, login, info, updateFunc, deleteFunc }