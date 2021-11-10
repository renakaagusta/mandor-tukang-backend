const config = require("../config/auth.config");
var nodemailer = require("nodemailer");
const db = require("../models");
const User = db.user;
const Role = db.role;
const Mail = db.mail;
const Partner = db.partner;

var url = "http://52.170.214.236:3000/api/v1/auth/";

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var sanitize = require("mongo-sanitize");

const Cryptr = require("cryptr");
const cryptr = new Cryptr("fifa");

var multer = require("multer");

var admin = require('./../../firebase-admin-sdk.json');

const notification_options = {
    priority: "high",
    timeToLive: 60 * 60 * 24
};

var id = "";

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './../img/users');
    },
    filename: function (req, file, callback) {
        console.log(file.originalname);
        callback(null, file.originalname);
    }
});

var upload = multer({
    storage: storage
}).array('images', 2);

exports.index = async function (req, res) {
    var users = User.aggregate([{
        $project: {
            _id: 1,
            username: 1,
            email: 1,
            password: 1,
        },
    }, ]).exec(function (err, data) {
        if (err)
            return res.status(200).json({
                status: 500,
                message: err,
                data: null,
            });
        return res.status(200).json({
            status: 200,
            message: "User Added Successfully",
            data: data,
        });
    });
};

exports.findById = (req, res) => {
    console.log("haloo");
    console.log(req.params);
    User.findById(req.params.id, (err, user) => {
        console.log(user);
        if (err)
            return res.status(500).json({
                status: 500,
                message: "User Added Successfully",
                data: null,
            });
        return res.status(200).json({
            status: 200,
            message: "User Added Successfully",
            data: user,
        });
    });
}

exports.signup = async function (req, res) {
    console.log(req.body);

    const user = new User({
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        phoneNumber: req.body.phoneNumber,
        role: req.body.role,
        subrole: req.body.subRole,
    });

    user.save(async function (err, user) {
        if (err) return res.status(500).send(err);
        if (req.body.role == 'partner') {
            const partner = new Partner({
                'user': user._id,
                'role': req.body.subrole,
                'service': req.body.service,
                'subservices': req.body.subservice,
                'location.address': req.body.address ? req.body.address : '-',
                'location.province': req.body.province ? req.body.province : 'Jawa Tengah',
                'location.city': req.body.city ? req.body.city : 'Pati',
                'location.latitude': req.body.latitude ? req.body.latitude : '-6.789594',
                'location.longitude': req.body.longitude ? req.body.longitude : '111.011662',
            })
            await partner.save((err, partner) => {
                if (err) return res.status(500).send(err)
                return res.status(200).send({
                    status: 200,
                    message: "Partner was registered successfully!",
                    data: null,
                });
            })
        } else {
            return res.status(200).send({
                status: 200,
                message: "Customer was registered successfully!",
                data: null,
            });
        }
    });
};

exports.signin = (req, res) => {
    var username = sanitize(req.body.username);
    var password = sanitize(req.body.password);
    var role = sanitize(req.body.role);

    var filter = {};
    if (
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
            username
        )
    )
        filter = {
            email: username,
        };
    else
        filter = {
            username: username,
        };

    User.findOne(filter)
        .exec((err, user) => {
            if (err) {
                return res.status(500).send({
                    status: 500,
                    message: err,
                    data: null,
                });
            }
            console.log(user);

            if (!user) {
                return res.status(404).send({
                    status: 404,
                    message: "User was not found!",
                    data: null,
                });
            }

            var passwordIsValid = bcrypt.compareSync(password, user.password);

            if (!passwordIsValid) {
                return res.status(401).send({
                    status: 401,
                    message: "User was nout found!",
                    data: null,
                });
            }

            var token = jwt.sign({
                id: user.id
            }, config.secret, {
                expiresIn: 86400,
            });

            var authorities = [];

            for (let i = 0; i < user.roles.length; i++) {
                authorities.push(user.roles[i].name);
            }

            token = cryptr.encrypt(token);

            User.findOneAndUpdate({
                username: user.username,
            }, {
                fcmToken: req.body.fcmToken,
            }, function (err, user) {

                return res.status(200).send({
                    status: 200,
                    message: "Success Login!",
                    data: {
                        id: user._id,
                        username: user.username,
                        firstname: user.firstname,
                        lastname: user.lastname,
                        image: user.image,
                        verification: user.verification,
                        email: user.email,
                        phoneNumber: user.phoneNumber,
                        roles: authorities,
                        participant: user.participant,
                        accessToken: token,
                    },
                });
            })
        });
};

exports.changeImageProfile = function (req, res) {
    console.log("halooo");

    upload(req, res, (err) => {
        
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }
        console.log("/.......")
        User.findOneAndUpdate({
                _id: req.params.id
            }, {
                $set: {
                    image: req.files[0].originalname
                },

            }, {
                new: true
            })
            .then((user) => {
                if (err)
                    console.log(err);

                if (user) {
                    return res.status(200).send({
                        status: 200,
                        message: "Image was updated successfully",
                        data: {
                            image: user.image
                        },
                    });
                } else {
                    
                    return res.status(400).json({
                        status: 404,
                        message: "FCM Token was not found",
                        data: {},
                    });
                }
            })
            .catch((err) => {
                console.log('11111')
                console.log(err)
                return res.status(500).send({
                    status: 500,
                    message: err,
                    data: null,
                });
            });

    });

};

exports.updateToken = function (req, res) {
    User.findOneAndUpdate({
            _id: id
        }, {
            $set: {
                fcmToken: req.body.fcmToken
            },
        })
        .then((user) => {
            if (user) {
                return res.status(200).send({
                    status: 200,
                    message: "FCM Token was updated successfully",
                    data: player,
                });
            } else {
                return res.status(400).json({
                    status: 404,
                    message: "FCM Token was not found",
                    data: null,
                });
            }
        })
        .catch((err) => {
            return res.status(500).send({
                status: 500,
                message: err,
                data: null,
            });
        });
};

exports.update = function (req, res) {
    console.log(req.body);
    console.log(req.params);
    User.findOneAndUpdate({
            _id: req.params.id
        }, {
            $set: {
                username: req.body.username,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                phoneNumber: req.body.phoneNumber,
            },
        })
        .then((user) => {console.log(user)
            if (user) {
                return res.status(200).send({
                    status: 200,
                    message: "Profile was updated successfully",
                    data: user,
                });
            } else {
                return res.status(400).json({
                    status: 404,
                    message: "Profile Token was not found",
                    data: null,
                });
            }
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).send({
                status: 500,
                message: err,
                data: null,
            });
        });
};

exports.confirmEmail = (req, res) => {
    req.params.id = cryptr.decrypt(req.params.id);
    User.findOneAndUpdate({
            _id: req.params.id,
        }, {
            $set: {
                verification: 1,
            },
        }, {
            new: true
        },
        (err, user) => {
            if (err)
                return res.send({
                    status: 500,
                    message: err,
                    data: null,
                });

            return res.status(200).send({
                status: 200,
                message: "Email has been confirmed!",
                data: user,
            });
        }
    );
};

exports.checkExistUser = (req, res) => {
    User.findOne({
        $or: [{
            'username': req.params.username
        }, {
            'phoneNumber': req.params.phoneNumber
        }, {
            'email': req.params.email
        }]
    }, (err, user) => {
        console.log(req.params);

        if (err)
            return res.send({
                status: 500,
                message: err,   
                data: null,
            });

        console.log(req.params.id);
        console.log(user)
        if (user) {
            if ((user.username == req.params.username)&&(user.id != req.params.id)) {
                console.log("halo1");
                return res.send({
                    status: 200,
                    message: "User with username was Exist",
                    data: user,
                });
            } else if ((user.phoneNumber == req.params.phoneNumber)&&(user.id != req.params.id)) {
                console.log("halo2");
                return res.send({
                    status: 200,
                    message: "User with phoneNumber was Exist",
                    data: user,
                });
            } else if ((user.email == req.params.email)&&(user.id != req.params.id)) {
                console.log("halo3");
                return res.send({
                    status: 200,
                    message: "User with email was Exist",
                    data: user,
                });
            }
            return res.send({
                status: 200,
                message: "User is available",
                data: null,
            });
        } else {
            console.log("yes");
            return res.send({
                status: 200,
                message: "User is available",
                data: null,
            });
        }
    })
}

exports.makeAdmin = (req, res) => {
    var newRole = [];
    Role.find((err, roles) => {
        roles.forEach((role) => {
            if (role.name != "participant") {
                newRole.push(role._id);
                console.log(newRole);
            }
            console.log(roles);
        });

        User.findOneAndUpdate({
                _id: req.params.id,
            }, {
                $set: {
                    roles: newRole,
                },
            }, {
                new: true
            },
            (err, user) => {
                if (err)
                    return res.send({
                        status: 500,
                        message: err,
                        data: null,
                    });

                return res.status(200).send({
                    status: 200,
                    message: "User has successfully granted as admin!",
                    data: user,
                });
            }
        );
    });
};