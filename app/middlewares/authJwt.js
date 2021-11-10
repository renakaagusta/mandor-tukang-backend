const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
const Role = db.role;

const Cryptr = require('cryptr');
const cryptr = new Cryptr('fifa');

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res
            .status(401)
            .send({ status: 401, message: "Access token is required!", data: null });
    }

    token = cryptr.decrypt(token);

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res
                .status(403)
                .send({
                    status: 403,
                    message: "Your session has been finished!",
                    data: null,
                });
        }
        req.userId = decoded.id;
        next();
    });
};

isAdmin = (req, res, next) => {
    let token = req.headers["x-access-token"];
    console.log(token);

    if (!token) {
        return res
            .status(401)
            .send({ status: 401, message: "Access token is required!", data: null });
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

        User.findById(req.userId).exec((err, user) => {
            if (err) {
                return res.status(500).send({ status: 500, message: err, data: null });
            }

            Role.find({
                    _id: { $in: user.roles },
                },
                (err, roles) => {
                    if (err) {
                        return res
                            .status(500)
                            .send({ status: 500, message: err, data: null });
                    }

                    for (let i = 0; i < roles.length; i++) {
                        if (roles[i].name === "admin") {
                            next();
                            return;
                        }
                    }

                    return res.status(403).send({
                        status: 403,
                        message: "Admin role is required!",
                        data: null,
                    });
                }
            );
        });
    });

};

isParticipant = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            return res.status(500).send({ status: 500, message: err, data: null });
        }

        Role.find({
                _id: { $in: user.roles },
            },
            (err, roles) => {
                if (err) {
                    return res
                        .status(500)
                        .send({ status: 500, message: err, data: null });
                }

                for (let i = 0; i < roles.length; i++) {
                    if (roles[i].name === "participant") {
                        next();
                        return;
                    }
                }

                res.status(403).send({
                    status: 403,
                    message: "Participant role is required!",
                    data: null,
                });
            }
        );
    });
};

const authJwt = {
    verifyToken,
    isAdmin,
    isParticipant,
};
module.exports = authJwt;