
module.exports = function (err, req, res, next) {

    const { name: error } = err;

    switch (error) {
        case "UnauthorizedError": {
            res.status(401).json({ message: "User not valid please check it" })
            break;
        }
        case "ValidationError": {
            res.status(401).json({ message: "User not valid please check it" })
            break;
        }
        default: {
            res.status(500).json({ message: err})
            break;
        }
    }

    next();
}

