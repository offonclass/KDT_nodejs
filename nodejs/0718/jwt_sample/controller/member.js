const { Member, Profile } = require('../models')
const jwt = require('jsonwebtoken')
const crypto = require('crypto');
const bcrypt = require('bcrypt');

// 회원가입
exports.signup = async (req, res) => {





    try {
        const { userId, pw, username, age, email } = req.body;
        // 존재 여부 확인
        const find = await Member.findOne({ where: { userId } });
        console.log('find', find);
        if (find) {
            res.json({ result: false, message: '이미 존재하는 회원' });

        } else {
            const sign = bcrypt.hashSync(pw, 10)
            const result = await Member.create({ userId, password: sign })
            console.log('signup!!!! : ', age);

            await Profile.create({ username, age, email, memberId: result.id });
            res.json({ result: true });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ result: false, message: '서버오류' })
    }
};

exports.login = async (req, res) => {
    try {
        const { userId, password } = req.body;
        const find = await Member.findOne({ where: { userId } })
        if (find) {
            const result = bcrypt.compareSync(password, find.password);
            if (result) {
                //jwt토큰 발행
                /*
                expiresIn: 만료시간
                algorithm: 서명 알고리즘 지정
                issuer: 토큰 발급자 지정
                */
                const token = jwt.sign({ id: find.id, userId: find.userId }, process.env.SECRET, { expiresIn: '24h' })
                // console.log(process.env.SECRET);
                const response = {
                    // id: find.id,
                    // userId: find.userId,
                    token
                };
                res.json({ result: true, code: 100, response, message: '로그인 성공' });
            } else {
                res.json({ result: false, code: 1000, response: null, message: '비밀번호 틀렸습니다.' });
            }
        } else {
            res.json({ result: false, code: 1001, response: null, message: '회원이 아닙니다.' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ result: false, message: '서버오류' })
    }

}

// 회원조회
exports.find = async (req, res) => {
    try {
        console.log('req!!', req.userInfo);
        const { id } = req.userInfo;
        const result = await Member.findByPk(id, {
            attributes: ['userId', 'password'],
            // include: 쿼리를 실행할때 관련된 모델의 데이터도 함께 조회할 수 있도록 하는 옵션
            include: [{ model: Profile, attributes: ['username', 'age', 'email'] }]
        });
        console.log('find : ', result);
        res.json({ result: true, response: result })
    } catch (error) {
        console.log(error);
        res.status(500).json({ result: false, message: '서버오류' })
    }


};

exports.update = async (req, res) => {
    try {
        const id = req.userInfo.id
        const { password, username, age, email } = req.body;
        const find = await Member.findByPk(id);
        if (find) {
            await Member.update({ password }, { where: { id } });
            await Profile.update({ username, age, email }, { where: { memberId: id } })
            res.json({ result: true, message: '회원이 없습니다.' })
        } else {
            res.json({ result: false, me })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ result: false, message: '서버오류' })
    }
}

exports.deleteFunc = async (req, res) => {
    try {
        const { id } = req.userId;
        await Profile.destroy({ where: { memberId: id } })
        await Member.destroy({ where: { id } })
        res.json({ result: true })
    } catch (error) {
        console.log(error);
        res.status(500).json({ result: false, message: '서버오류' })
    }
}

