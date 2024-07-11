

const main = (req, res) => {
    res.render('index')
}

const admin = (req, res) => {
    res.render('admin')
}

const userInfo = (req, res) => {
    res.render('userinfo')
}

const signUp = (req, res) => {
    res.render('signup')
}

module.exports = { main, admin, userInfo, signUp}