const userModel = require('../model/user')

exports.user = (req, res) => {
    res.render('user', { userInfo: userModel.userInfo() });
};

