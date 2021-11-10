// Import Player model
const { response } = require("express");
const db = require("../models");

const Notification = db.notification;

exports.readAll = function (req, res) {
    Notification.findUpdate({ to: req.params.userId }, {
        readAt: req.body.date
    }).then((notifications) => {

        if (err)
            return res.status(400).send({
                status: 500,
                message: err,
                data: null,
            });

        return res.status(200).send({
            status: 200,
            message: "Notification was read successfully",
            data: null,
        });
    })
};

exports.read = function (req, res) {
    Notification.findOneAndUpdate({ _id: req.params.id }, {
        readAt: req.body.date
    }).then((notification) => {

        if (err)
            return res.status(400).send({
                status: 500,
                message: err,
                data: null,
            });

        return res.status(200).send({
            status: 200,
            message: "Notification was read successfully",
            data: notification,
        });
    })
};

// Handle view actions
exports.findByUser = async function (req, res) {
    console.log(req.params.userId)
    await Notification.find({
        to: req.params.userId,
    },
        async function (err, notifications) {
            if (err)
                return res.status(400).send({
                    status: 400,
                    message: err,
                    data: null,
                });

            return res.status(200).send({
                status: 200,
                message: "Notification Detail Loading...",
                data: notifications,
            });
        }
    );
};

// Handle view actions
exports.findByUnreadUser = async function (req, res) {
    await Notification.find({
        to: req.params.userId,
        date_at: null,
    },
        async function (err, notifications) {
            if (err)
                return res.status(400).send({
                    status: 400,
                    message: err,
                    data: null,
                });

            return res.status(200).send({
                status: 200,
                message: "Notification Detail Loading...",
                data: notifications,
            });
        }
    );
};
