// Import Player model
const {
    response
} = require("express");
const db = require("../models");
const Order = db.order;
const User = db.user;
const Partner = db.partner;
const Feedback = db.feedback;
const Notification = db.notification;
const fire = require("./../config/firebase");
const uuidv4 = require('uuid').v4;

const midtransClient = require('midtrans-client');
// Create Core API instance
let coreApi = new midtransClient.CoreApi({
    isProduction: false,
    serverKey: 'SB-Mid-server-vzI4UQ2sMprJ7QBbvIcYSCSc',
    clientKey: 'SB-Mid-client-2IBXB0waX2pMumh2'
});

const notification_options = {
    priority: "high",
    timeToLive: 60 * 60 * 24
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

exports.create = async function (req, res) {
    upload(req, res, (err) => {
        if (err) return res.status(500).send(err);

        console.log(req.body);

        var _order = {
            customerId: req.body.customerId,
            partnerId: req.body.partnerId,
            service: req.body.service,
            subservice: req.body.subservice,
            description: req.body.description,
            location: {
                latitude: req.body.latitude,
                longitude: req.body.longitude,
                description: req.body.locationDescription,
            },
            images: [],
            payment: {
                'survey': {
                    id: req.body.paymentId,
                    items: req.body.paymentItems,
                    status: 0,
                }
            },
            date: req.body.date,
            time: req.body.time,
            status: 0,
        }

        var order = new Order(_order);

        req.files.forEach((file) => {
            order.images.push({
                'url': file.originalname
            });
        })


        order.save(async function (err, order) {
            if (err)
                return res.status(400).send({
                    status: 400,
                    message: err,
                    data: null,
                });

            const options = notification_options
            const payload = {
                'notification': {
                    'title': 'Ada order baru untuk anda',
                    'body': 'ketuk untuk lihat',
                },
                'data': {
                    'personSent': 'userSent '
                }
            };

            console.log(order);
            Partner.findById(order.partnerId, (err, partner) => {
                if (err)
                    console.log(err)

                console.log(order.partnerId)
                console.log(partner)

                User.findById(partner.user, (err, user) => {
                    if (err)
                        console.log(err)

                    if (user.fcmToken != null)
                        fire.messaging().sendToDevice(user.fcmToken, payload, options)
                        .then(response => {
                            console.log(response)
                        })
                        .catch(error => {
                            console.log(error);
                        });

                    console.log(user)

                    var notification = new Notification({
                        to: user._id,
                        title: user.username,
                        subtitle: "Membuat pesanan baru",
                        content: order._id,
                        type: 0,
                    })

                    notification.save()

                    return res.status(200).send({
                        status: 200,
                        message: "Order was created successfully",
                        data: order,
                    });

                })
            })
        });
    });
};

exports.accept = function (req, res) {
    console.log(req.params);
    console.log(req.body)
    Order.findOneAndUpdate({
            _id: req.params.id
        }, {
            status: 1
        }).then((order) => {
            if (order) {
                Partner.findById(order.partnerId, (err, partner) => {
                    User.findById(partner.user, (err, user) => {
                        var notification = new Notification({
                            to: order.customerId,
                            title: user.username,
                            subtitle: 'Pesanan anda telah diterima',
                            content: order._id,
                            type: 0,
                        });

                        User.findById(order.customerId, (err, customer) => {
                            if (err) {
                                console.log("oopss")
                                console.log(err);
                                return res.send({
                                    status: 200
                                });
                            }


                            const options = notification_options
                            const payload = {
                                'notification': {
                                    'title': user.username,
                                    'body': 'Pesanan anda telah diterima',
                                },
                                'data': {
                                    'personSent': 'userSent '
                                }
                            };

                            fire.messaging().sendToDevice(customer.fcmToken, payload, options)
                                .then(response => {

                                })
                                .catch(error => {

                                    console.log("------")
                                    console.log(err)
                                });
                        })

                        notification.save((err, _notification) => {
                            if (err)
                                return res.status(400).send({
                                    status: 500,
                                    message: err,
                                    data: null,
                                });

                            return res.status(200).send({
                                status: 200,
                                message: "Order was accepted successfully",
                                data: order,
                            });
                        });
                    })
                });

            } else {
                return res.status(400).json({
                    status: 404,
                    message: "Order was not found",
                    data: null,
                });
            }
        })
        .catch((err) => {
            return res.status(500).send({
                status: 500,
                message: err,
                data: null
            })
        })
};

exports.createChat = function (req, res) {
    console.log(req.body);
    Order.findOneAndUpdate({
            _id: req.params.id
        }, {
            $push: {
                chat: {
                    to: req.body.userId,
                    content: req.body.content,
                    type: 1,
                    created_at: req.body.createdAt
                }
            }
        }).then((order) => {
            if (order) {
                var notification = new Notification({
                    to: req.body.customerId,
                    title: 'Pesan dari ' + req.body.username,
                    subTitle: req.body.subtitle,
                    content: order._id,
                    type: 1
                })

                if (req.body.partnerId) {
                    console.log("..........\\\\\\\\");
                    Partner.findOne({
                        _id: order.partnerId
                    }, (err, partner) => {
                        console.log(req.body.userId);
                        User.findOne({
                            _id: req.body.userId
                        }, (err, from) => {
                            User.findOne({
                                _id: order.customerId
                            }, (err, to) => {
                                var notification = {}

                                if (req.body.type == 0) {

                                    notification = {
                                        title: from.username,
                                        body: req.body.content
                                    }

                                } else {

                                    notification = {
                                        title: from.username,
                                        body: 'Mengirimkan foto'

                                    }
                                }

                                var payload = {
                                    notification: notification
                                };

                                var options = {
                                    priority: "high",
                                    timeToLive: 60 * 60 * 24
                                };

                                fire.messaging().sendToDevice(to.fcmToken, payload, options)
                                    .then(response => {

                                        console.log(response);
                                        console.log(response.results[0].error);
                                        fire.firestore().collection('chats').doc(order.id).collection('chats').add({
                                            to: partner.user,
                                            content: req.body.content,
                                            type: 1,
                                            created_at: req.body.createdAt
                                        })
                                    })
                                    .catch(error => {
                                        console.log(error);
                                        console.log(error.results[0]);
                                        console.log(error.results[0].error);
                                    });
                                notification.save((err, _notification) => {
                                    if (err)
                                        return res.status(400).send({
                                            status: 500,
                                            message: err,
                                            data: null,
                                        });

                                    return res.status(200).send({
                                        status: 200,
                                        message: "Order was accepted successfully",
                                        data: order,
                                    });
                                });
                            })
                        })
                    })

                } else {
                    console.log(req.body);

                    User.findOne({
                        _id: req.body.userId
                    }, (err, from) => {
                        Partner.findById({
                            _id: order.partnerId
                        }, (err, partner) => {
                            console.log(err);
                            console.log("order partner id")
                            console.log(order.partnerId)
                            console.log("partner")
                            console.log(partner.user)
                            User.findOne({
                                _id: partner.user
                            }, (err, to) => {
                                var condition = order.id
                                var notification = {}

                                console.log('---to')
                                console.log(to)
                                console.log('--from')
                                console.log(from)

                                if (req.body.type == 0) {

                                    notification = {
                                        title: from.username,
                                        body: req.body.content
                                    }

                                } else {

                                    notification = {
                                        title: from.username,
                                        body: 'Mengirimkan foto'

                                    }
                                }

                                var payload = {
                                    notification: notification
                                };

                                var options = {
                                    priority: "high",
                                    timeToLive: 60 * 60 * 24
                                };

                                fire.messaging().sendToDevice(from.fcmToken, payload, options)
                                    .then(response => {

                                        console.log(response);
                                        console.log(response.results[0].error);
                                        fire.firestore().collection('chats').doc(order.id).collection('chats').add({
                                            to: req.body.userId,
                                            content: req.body.content,
                                            type: 1,
                                            created_at: req.body.createdAt
                                        })
                                    })
                                    .catch(error => {
                                        console.log(error);
                                        console.log(error.results[0]);
                                        console.log(error.results[0].error);
                                    });
                            })
                        })
                        notification.save((err, _notification) => {
                            if (err)
                                return res.status(400).send({
                                    status: 500,
                                    message: err,
                                    data: null,
                                });

                            return res.status(200).send({
                                status: 200,
                                message: "Order was accepted successfully",
                                data: order,
                            });
                        });
                    })




                }

            } else {
                return res.status(400).json({
                    status: 404,
                    message: "Order was not found",
                    data: null,
                });
            }
        })
        .catch((err) => {
            return res.status(500).send({
                status: 500,
                message: err,
                data: null
            })
        })
};

exports.findCustomerOrderByStatus = async function (req, res) {
    await Order.find({
            customerId: req.params.customerId,
            status: req.params.status,
        }, {
            partnerId: false,
            relatives: false,
            items: false,
            images: false,
        },
        async function (err, order) {
            if (err)
                return res.status(400).send({
                    status: 400,
                    message: err,
                    data: null,
                });

            console.log(order.length);

            return res.status(200).send({
                status: 200,
                message: "Order Detail Loading...",
                data: order,
            });
        }
    );
};

// Handle view actions
exports.findPartnerOrderByStatus = async function (req, res) {
    await Partner.find({
        user: req.params.partnerId
    }, async function (err, partner) {
        if (err)
            return res.status(400).send({
                status: 400,
                message: err,
                data: null,
            });

        console.log(req.body);

        await Order.find({
                partnerId: partner[0]._id,
                status: req.params.status,
            }, {
                partnerId: false,
                relatives: false,
                items: false,
            },
            async function (err, orders) {
                if (err)
                    return res.status(400).send({
                        status: 400,
                        message: err,
                        data: null,
                    });

                if (orders.length == 0) {
                    return res.status(200).send({
                        status: 200,
                        message: "Order Detail Loading...",
                        data: [],
                    });
                }


                orders = JSON.parse(JSON.stringify(orders));

                n_orders = 0;

                orders.forEach((order) => {
                    User.findById(order.customerId, (err, user) => {
                        if (err)
                            return res.status(400).send({
                                status: 400,
                                message: err,
                                data: null,
                            });

                        n = 0;
                        orders.forEach((order) => {
                            if (order.customerId == user._id) {
                                order.customer = user;
                            }
                            n++;
                        })

                        n_orders++;
                        console.log(orders)

                        if (n_orders == orders.length) {
                            return res.status(200).send({
                                status: 200,
                                message: "Order Detail Loading...",
                                data: orders,
                            });
                        }
                    })
                })
            }
        );
    })

};

// Handle view actions
exports.findById = async function (req, res) {
    await Order.find({
            _id: req.params.id
        },
        async function (err, order) {
            if (err)
                return res.status(400).send({
                    status: 400,
                    message: err,
                    data: null,
                });

            return res.status(200).send({
                status: 200,
                message: "Order Detail Loading...",
                data: order,
            });
        }
    );
};

exports.addSurveyData = function (req, res) {
    console.log(req.params.id)
    Order.findOneAndUpdate({
            _id: req.params.id
        }, {
            materials: req.body.materials,
        }).then((order) => {

            console.log(order)
            User.findById(
                order.customerId, (err, customer) => {

                    console.log()
                    const options = notification_options

                    const payload = {
                        'notification': {
                            'title': 'Ada order baru untuk anda',
                            'body': 'ketuk untuk lihat',
                        },
                        'data': {
                            'personSent': 'userSent '
                        }
                    };

                    fire.messaging().sendToDevice(customer.fcmToken, payload, options)
                        .then(response => {
                            console.log(response)
                        })
                        .catch(error => {
                            console.log(error);
                            console.log("------")
                            console.log(err)
                        });

                    return res.status(200).send({
                        status: 200,
                        message: "Order was updated successfully",
                        data: null
                    })
                })
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).send({
                status: 500,
                message: err,
                data: null
            })
        })
};

exports.review = function (req, res) {
    Order.findOneAndUpdate({
            id: req.params.id
        }, {
            status: 3,
        }).then((order) => {
            if (order) {

                User.findOne({
                    _id: order.partnerId
                }, (err, partner) => {

                    const options = notification_options

                    fire.messaging().sendToDevice(partner.fcmToken, "Pesanan sudah selesai", options)
                        .then(response => {

                        })
                        .catch(error => {
                            console.log(error);
                        });
                })

                var feedback = new Feedback({
                    order: req.params.id,
                    rating: req.body.rating,
                    review: req.body.review,
                });

                feedback.save(async function (err, feedback) {
                    if (err)
                        return res.status(400).send({
                            status: 400,
                            message: err,
                            data: null,
                        });

                    partner.findOne({
                        _id: order.partnerId
                    }, async function (err, partner) {
                        if (partner.rating != null) {
                            var rating = (partner.rating.average * partner.rating.quantity + req.body.rating) / (partner.rating.quantit + 1);
                            var quantity = parnet.rating.quantity + 1;
                            partner.rating.average = rating;
                            partner.quantity = quantity;
                            partner.rating.rates.push(req.body.rating);

                            await partner.save()

                            var notification = new Notification({
                                to: req.body.partnerId,
                                title: 'Pesanan sudah selesai',
                                content: order._id,
                                type: 0,
                            })

                            notification.save((err, _notification) => {
                                if (err)
                                    return res.status(400).send({
                                        status: 500,
                                        message: err,
                                        data: null,
                                    });

                                return res.status(200).send({
                                    status: 200,
                                    message: "Order finish",
                                    data: order,
                                });
                            })
                        } else {
                            partner.rating = req.body.rating;
                            partner.quantity = 1;
                            partner.rates.push(req.body.rating);

                            await partner.save();

                            var notification = new Notification({
                                to: req.body.partnerId,
                                title: 'Pesanan telah selesai',
                                content: order._id,
                                type: 0,
                            })

                            notification.save((err, _notification) => {
                                if (err)
                                    return res.status(400).send({
                                        status: 500,
                                        message: err,
                                        data: null,
                                    });

                                return res.status(200).send({
                                    status: 200,
                                    message: "Order finish",
                                    data: order,
                                });
                            })
                        }
                    })
                });
            } else {
                return res.status(400).json({
                    status: 404,
                    message: "Order was not found",
                    data: null,
                });
            }
        })
        .catch((err) => {
            return res.status(500).send({
                status: 500,
                message: err,
                data: null
            })
        })
};