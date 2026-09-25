const jwt = require("jsonwebtoken")

function checkAuth(req, res, next) {
    const token = req.cookies.accessToken

    if (!token) {
        return res.status(401).json({
            message: "You are Unauthorized",
            data: null
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SESSION_SECRET)

        req.user = decoded

        next()

    } catch (error) {

        return res.status(401).json({
            message: "You are Unauthorized",
            data: null
        })
    }

}

module.exports = checkAuth