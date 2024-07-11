const main = (req, res) => {
    res.render("index");
}

const pageVisitor = (req, res) => {
    res.render('visitor');
}

module.exports = { main, pageVisitor };