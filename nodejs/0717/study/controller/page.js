const main = (req, res) => {
    res.render('index')
}
const signup = (req, res) => {
    res.render('signup')
}
const login = (req, res) => {
    res.render('login')
}
const profile = (req, res) => {
    res.render('profile')
}


module.exports = { main, signup, login, profile }