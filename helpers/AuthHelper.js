const jwt = require('jsonwebtoken');

const isLoggedIn = (req, res, next) => {
    const header = req.headers.authorization
    const token = header.split(' ')[1]
    try{
        const isValid = jwt.verify(token, process.env.JWT_SECRET);
        next();
    }
    catch(err) {
        res.json({
            auth: false,
            message: 'You are not authenticated to do so'
        })
    }
    // next();
}

module.exports = {
    isLoggedIn
}