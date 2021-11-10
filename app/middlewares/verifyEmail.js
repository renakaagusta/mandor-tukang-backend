const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;
var jwt = require("jsonwebtoken");
const config = require("../config/auth.config");

const Cryptr = require('cryptr');
const cryptr = new Cryptr('fifa');

checkEmail = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res
            .status(403)
            .send({ status: 403, message: "Access token is required!", data: null });
    }

    token = cryptr.decrypt(token);

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res
                .status(401)
                .send({
                    status: 401,
                    message: "Your session has been finished!",
                    data: null,
                });
        }
        req.userId = decoded.id;
    });

    User.findById(req.userId).exec((err, user) => {
        if (err) {
            return res.status(500).send({ status: 500, message: err, data: null });
        }

        if (user.verification == 0) {
            return res
                .status(403)
                .send({ status: 403, message: "Email is not verified", data: null });
        }

        next();
    });
};

const verifyEmail = {
    checkEmail,
};

module.exports = verifyEmail;