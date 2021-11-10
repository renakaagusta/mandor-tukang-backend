const mongoose = require("mongoose");

const Service = mongoose.model(
    "Service",
    new mongoose.Schema({
        name: {
            type: String,
        },
        description: {
            type: String,
        },
        price: {
            type: Number,
        },
        unit: {
            type: String,
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

module.exports = User;