const jwt = require('jsonwebtoken');
exports.auth = (req, res, next) => {
    const headers = req.headers.authorization;
    console.log(headers);
    if(!headers) {
        return res.status(401).json({result: false})
    }
    const [bearer, token] = headers.split(' ')
    if( bearer === "Bearer") {
        jwt.verify(token, process.env.SECRET, (err, decode) => {
            if(err) {
                return res.status(403).json({result: false})
            }
            req.userInfo = decode //다음 미들웨어로 전달 한달하는 값
            next(); 
        })
    } else {
        return res.status(401).json({result: false})
    }
}