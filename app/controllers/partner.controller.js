// Import Player model
const { response } = require("express");
const db = require("../models");
const User = db.user;
const Player = db.player;
const Partner = db.partner;

// Handle index actions
exports.index = async function (req, res) {
    var players = Player.aggregate([{
        $project: { ID: 1, Name: 1, Club: 1, Nationality: 1 },
    },]).exec(function (err, data) {
        if (err)
            return res.status(500).json({
                status: 500,
                message: "Player Added Successfully",
                data: null,
            });
        return res.status(200).json({
            status: 200,
            message: "Player Added Successfully",
            data: data,
        });
    });
};

// Handle index actions
exports.indexByPage = async function (req, res) {
    req.query.limit = parseInt(req.query.limit)
    req.query.page = parseInt(req.query.page)
    if (!req.query.page) req.query.page = 1;
    try {
        var totalPlayer = await Player.count();
        var players = await Player.find()
            .sort({ ID: -1 })
            .limit(req.query.limit)
            .skip((req.query.page - 1) * req.query.limit)
            .exec((err, players) => {
                return res.status(200).send({
                    status: 200,
                    message: "Player Added Successfully",
                    data: {
                        players: players,
                        totalPage: Math.ceil(totalPlayer / req.query.limit),
                    },
                });
            });
    } catch (err) {
        return res.status(500).send({
            status: 500,
            message: err,
            data: null,
        });
    }
};

// Handle search actions
exports.search = async function (req, res) {
    var players = Player.caseInsesitiveDemo
        .find({ Name: { $regex: req.query.name } })
        .exec(function (err, data) {
            if (err)
                return res.status(500).send({
                    status: 500,
                    message: err,
                    data: null,
                });
            return res.status(200).send({
                status: 200,
                message: "Player Added Successfully",
                data: data,
            });
        });
};

// Handle view actions
exports.findBySubserviceAndCity = (req, res) => {
    Partner.find({
        'location.city': req.params.city,
        'service': req.params.service,
        'subservices': req.params.subservice
    }, (err, partners) => {
        if (err) 
        return res.status(400).send({
            status: 400,
            message: err,
            data: null,
        });
        if (partners.length > 0) {
            partners = JSON.parse(JSON.stringify(partners));
            
            var i = 0;
            var returned = 0;
            partners.forEach( (doc) => {
                i++;
                User.findById(doc.user, function (err, user) {
                    doc.user = user;
                    for (j = 0; j < partners.length; j++) {
                        if (partners.user == user.id) {
                            partners.push(doc);
                        }
                    }

                    var finish = 1;
                    
                    for(let i = 0; i< partners.length; i++){
                        console.log(typeof partners[i].user);
                        if(typeof partners[i].user == "string")
                            finish = 0;
                    }

                    if (i == partners.length && returned == 0 && finish == 1) {
                        returned = 1;
                        console.log("return")
                        return res.status(200).send({
                            status: 200,
                            message: "Partner Added Successfully",
                            data: partners,
                        })
                    }
                })
            })
        } else {
            return res.status(200).send({
                status: 200,
                message: "Partner not found",
                data: partners,
            })
        }
    })
};

exports.find = async function (req, res) {
    await Partner.find({
        '_id': req.params.id,
    }, async function (err, partner) {
        if (err)
            return res.status(400).send({
                status: 400,
                message: err,
                data: null,
            });



        await User.findById(partner[0].user, (err, user) => {
            if (err)
                return res.status(400).send({
                    status: 400,
                    message: err,
                    data: null,
                });

            partner = JSON.parse(JSON.stringify(partner));
            partner[0].user = user;
            return res.status(200).send({
                status: 200,
                message: "Player Added Successfully",
                data: partner,
            })
        })
    })
};

exports.findByUser = async function (req, res) {
    await Partner.find({
        'user': req.params.id,
    }, async function (err, partner) {
        if (err)
            return res.status(400).send({
                status: 400,
                message: err,
                data: null,
            });
            
        await User.findById(partner[0].user, (err, user) => {
            if (err)
                return res.status(400).send({
                    status: 400,
                    message: err,
                    data: null,
                });

            partner = JSON.parse(JSON.stringify(partner));
            partner[0].user = user;
            return res.status(200).send({
                status: 200,
                message: "Partner Added Successfully",
                data: partner,
            })
        })
    })
};


// Handle create actions
exports.create = async function (req, res) {
    var player = Player(req.body);

    var players = await Player.find().sort({ ID: -1 }).limit(1).exec();

    player.ID = parseInt(players[0].ID) + 1;

    player.save(async function (err, player) {
        if (err)
            return res.status(400).send({
                status: 400,
                message: err,
                data: null,
            });

        player = JSON.parse(JSON.stringify(player));

        return res.status(200).send({
            status: 200,
            message: "Player succesfully created",
            data: player,
        });
    });
};

// Handle update actions
exports.update = function (req, res) {
    var player = req.body;
    console.log(player);
    console.log(req.query);
    var id = parseInt(req.query.id);
    Player.findOneAndUpdate({ ID: id }, {
        $set: player,
    })
        .then((player) => {
            console.log(player);
            if (player) {
                return res.status(200).send({
                    status: 200,
                    message: "Player was updated successfully",
                    data: player,
                });
            } else {
                return res.status(400).json({
                    status: 404,
                    message: "Player was not found",
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

// Handle delete actions
exports.delete = function (req, res) {
    Player.remove({
        ID: req.query.id,
    },
        function (err, player) {
            if (err)
                return res.status(400).send({
                    status: 400,
                    message: err,
                    data: null,
                });

            return res.status(200).send({
                status: 200,
                message: "Player was deleted successfully",
                data: null,
            });
        }
    );
};



var multer = require("multer");

const {
    partner,
    user
} = require("../models");

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './../img/orders');
    },
    filename: function (req, file, callback) {
        console.log(file.originalname);
        callback(null, file.originalname);
    }
});

var upload = multer({
    storage: storage
}).array('images', 40);

exports.addCertificate = async function (req, res) {
    upload(req, res, (err) => {
        if (err) return res.status(500).send(err);console.log(req.files)

        var image = req.files[0].originalname;

        Partner.findOneAndUpdate({
            user: req.params.id
        }, {
            $push: {
                certificates: {
                    name: req.body.name,
                    description: req.body.description,
                    last_year: req.body.lastYear,
                    publisher: req.body.publisher,
                    image: image,
                    created_at: Date()
                }
            }
        }).then((partner) => {
            if (partner) {
                return res.status(200).json({
                    status: 200,
                    message: "Certificate was uploaded successfully",
                    data: null,
                });
            } else {
                return res.status(400).json({
                    status: 404,
                    message: "Partner was not found",
                    data: null,
                });
            }
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).send({
                status: 500,
                message: err,
                data: null
            })
        })


   });
};