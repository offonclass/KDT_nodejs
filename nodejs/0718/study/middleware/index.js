const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    const header = req.headers.authorization
    if(!header) {
        return res.status(401).json({result: false})
    }
    const token = header;
    jwt.verify(token, process.env.SECRET, (err, decode) => {
        if( err) {
            return res.status(403).json({result: false})
        }
        req.userInfo = decode
        next();
    })
}

module.exports = { auth }