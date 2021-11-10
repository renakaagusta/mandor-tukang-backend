const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsernameOrEmail = (req, res, next) => {
    User.findOne({
        username: req.body.username
    }).exec((err, user) => {
        if (err) {
            return res.status(500).send({ status: 500, message: err, data: null });
        }

        if (user) {
            return res.status(400).send({ status: 400, message: "This username has been used", data: null });
        }

        // Email
        User.findOne({
            email: req.body.email
        }).exec((err, user) => {

            if (err) {
                return res.status(500).send({ status: 500, message: err, data: null });
            }
            if (user) {
                return res.status(400).send({ status: 400, message: "This email has been used", data: null });
            }

            next();
        });
    });
};

checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
                res.status(400).send({
                    status: 400,
                    message: `Failed! Role ${req.body.roles[i]} does not exist!`,
                    data: null
                });
                return;
            }
        }
    }

    next();
};

const verifySignUp = {
    checkDuplicateUsernameOrEmail,
    checkRolesExisted
};

module.exports = verifySignUp;