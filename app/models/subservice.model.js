const mongoose = require("mongoose");

const SubServices = mongoose.model(
    "SubService",
    new mongoose.Schema({
        name: {
            type: String,
        },
        service: {
            type: String,
        },
        serviceFee: {
            type: Number,
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

module.exports = SubServices;