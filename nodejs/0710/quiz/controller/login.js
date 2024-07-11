const { id, pw } = require('../model/login');




exports.main = (req, res) => {
    res.render('index');
};

exports.get = (req, res) => {
    res.render('get')
}


exports.getLogin = (req, res) => {
    res.json({response: req.query})
};

exports.postLogin = (req, res) => {
    console.log(req.body);
    const {id: reqId, pw:reqPw} = req.body
    if( id === reqId && pw === reqPw) {
        res.json({result: true, userId: id })
    }else{
        res.json({result: false, userId: null})
    }
};

exports.post = (req, res) => {
    res.render('post')
}






