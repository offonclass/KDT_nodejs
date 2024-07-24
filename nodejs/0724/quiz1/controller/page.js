const login = (req, res) => {
    res.render('login')
}
const signup = (req, res) => {
    res.render('signup')
}
const userMain = (req, res) => {
    res.render('usermain')
}
const admin = (req, res) => {
    res.render('admin')
}
const submitBook = (req, res) => {
    res.render('submit-book')
}
const bookList = (req, res) => {
    res.render('book-list')
}
const bookListUser = (req, res) => {
    res.render('book-list-user')
}
const myRental = (req, res) => {
    res.render('myrental')
}
const userList = (req, res) => {
    res.render('userlist')
}

module.exports = { login, signup, userMain, admin, submitBook,
    bookList, bookListUser, myRental, userList }