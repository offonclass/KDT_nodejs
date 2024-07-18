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
            // 세션 생성
            req.session.user = find.id;
            console.log(req.session);
            res.json({result:true, message:'로그인 성공', id: req.session.user})
        } else {
            res.json({result:false, message:'비밀번호 오류'})
        }
    } else {
        res.json({result: false, message: '아이디가 존재하지 않습니다.'})
    }
}

const info = async (req, res) => {
    //req.params.id
    console.log('req!! : ', req.session);
    const id  = req.session.user;
    const find = await Member.findByPk(id);
    console.log('find', find);
    const { id: pkId, userid, username, pw } = find;
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
    const { name, pw } = req.body;
    const id  = req.session.user;
    await Member.update({ username: name, pw }, { where: { id } });
    res.json({ result: true });
};

const deleteFunc = async (req, res) => {
    const id  = req.session.user;
    await Member.destroy({ where: { id } });
    res.json({ result: true });
};

module.exports = { signup, login, info, updateFunc, deleteFunc }