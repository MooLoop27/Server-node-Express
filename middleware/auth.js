const auth = (req, res, next) => {
    const token = req.headers?.authorization

    if (token ==='password') {
        next()

        return
    }
    res.status(401).json({
        message: 'wrong password'
    })
}

module.exports = auth