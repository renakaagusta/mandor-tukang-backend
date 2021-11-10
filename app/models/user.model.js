const mongoose = require("mongoose");

const User = mongoose.model(
    "User",
    new mongoose.Schema({
        username: String,
        firstname: String,
        lastname: String,
        password: String,
        email: String,
        phoneNumber: String,
        fcmToken: String,
        image: {
            type: String,
            default: 'avatar.jpg'
        },
        verification: {
            type: Number,
            default: 0,
        },
        role: {
            type: String,
        },
        roles: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role",
        }, ],
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

module.exports = User;