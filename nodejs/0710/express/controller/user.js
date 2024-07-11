
const userModel = require('../model/user');

const main = (req, res) => {
    res.render('index', { users: userModel });
};

const register = (req, res) => {
    console.log(req.body);
    const { name, gender, major } = req.body;
    userModel.push({
        id: userModel.length + 1,
        name,
        gender,
        major
    })
    res.json({ result: true })
}

module.exports = { main, register };

