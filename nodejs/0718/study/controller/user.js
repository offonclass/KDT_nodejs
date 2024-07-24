const { User, Profile } = require("../models");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



const signup = async (req, res) => {
    try {
        console.log('req!!', req.body);
        const { userId, pw, username, age, email } = req.body;
        const findId = await User.findOne({ where: { userId } })
        const findEmail = await Profile.findOne({ where: { email } })
        if (findId) {
            res.json({ result: false, message: '아이디 중복' })
        } else if (findEmail) {
            res.json({ result: false, message: '이메일 중복' })
        } else {
            const sign = bcrypt.hashSync(pw, 10)
            const createId = await User.create({ userId, password: sign })
            await Profile.create({ username, age, email, userStudyId: createId.id })
            res.json({ result: true, message: '회원가입 성공' })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ result: false, message: '서버오류' })
    }
}



const login = async (req, res) => {
    try {
        console.log('req!!', req.body);
        const { userId, pw } = req.body;
        const find = await User.findOne({ where: { userId } })
        if (find) {
            const compare = bcrypt.compareSync(pw, find.password)
            console.log('compare!!', compare);
            if (compare) {
                const token = jwt.sign({ id: find.id, userId }, process.env.SECRET, { expiresIn: '24h' })
                res.json({ result: true, token, message: '로그인 성공' })
            }
        } else {
            res.json({ result: false, message: '아이디 없음' })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ result: false, message: '서버오류' })
    }

}

const profile = async (req, res) => {
    try {
        console.log('req!!', req.userInfo);
        const { id, userId } = req.userInfo;
        const { password } = await User.findOne({ where: { id } })
        const { username, age, email } = await Profile.findOne({ where: { userStudyId: id } })
        const response = { userId, pw: password, username, age, email }
        res.json({ result: true, response })
    } catch (error) {
        console.log(error);
        res.status(500).json({ result: false, message: '서버오류' })
    }
}

const update = async (req, res) => {
    try {
        const { id } = req.userInfo;
        const { pw, username, age, email, } = req.body
        const find = await User.findByPk(id)
        if (find) {
            const sign = bcrypt.hashSync(pw, 10)
            await User.update({ password: sign }, { where: { id } })
            await Profile.update({ username, age, email }, { where: { userStudyId: id } })
            res.json({ result: true, message: '회원정보 수정 성공' })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ result: false, message: '서버오류' })
    }
}

const deleteFunc = async (req, res) => {
    try {
        const { id } = req.userInfo;
        await User.destroy({ where: { id } })
        await Profile.destroy({ where: { userStudyId: id } })
        res.json({ result: true, message: '회원탈퇴 성공' })
    } catch (error) {
        console.log(error);
        res.status(500).json({ result: false, message: '서버오류' })
    }
}

module.exports = { signup, login, profile, update, deleteFunc }