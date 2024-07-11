const commentModel = require('../model/comment');


exports.main = (req, res) => {
    res.render('index');
};

exports.comments = (req, res) => {
    res.render('comments', { list: commentModel })
};

exports.comment = (req, res) => {
    
    console.log(req.params);
    console.log(req.params.page);
    console.log(typeof req.params.page);
    const page = Number(req.params.page);
    // comments 배열의 요소에 접근.
    res.render('comment', {data: commentModel[page-1]})
};



/* 
// 방법1
exports.main = () => {};

// 방법2
const main = () => {};
module.exports = { main };
 */
