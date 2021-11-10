checkToken = (req, res, next) => {
    let token = req.headers["auth-token"];

    if (!token) {
        return res
            .status(401)
            .send({ status: 401, message: "Access token is required!", data: null });
    }

    if (token == 'qwertyuiop') {
        next()
    } else {
        return res.status(403).send({
            status: 403,
            message: "Invalid token",
            data: null,
        });
    }

};

const verifyAdminToken = {
    checkToken,
};

module.exports = verifyAdminToken;