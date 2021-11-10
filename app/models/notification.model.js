const mongoose = require("mongoose");

const Notification = mongoose.model(
    "Notification",
    new mongoose.Schema({
        to: {
            type: String
        },
        title: {
            type: String
        },
        subtitle: {
            type: String
        },
        content: {
            type: String,
        },
        type: {
            type: Number,
        },
        link: {
            type: String,
        },
        read_at: {
            type: String,
            default: null,
        },
        created_at: {
            type: Date,
            default: Date.now(),
        },
        updated_at: {
            type: Date,
            default: Date.now(),
        },
    })
);

module.exports = Notification;