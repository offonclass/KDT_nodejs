const main = (req, res) => {
    res.render('index');
};
const login = (req, res) => {
    res.render('login');
};
const signup = (req, res) => {
    res.render('signup');
};

const profile = (req, res) => {
    res.render('profile');
};

module.exports = { main, login, signup, profile };
