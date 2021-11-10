const mongoose = require("mongoose");

const Services = mongoose.model(
    "Services",
    new mongoose.Schema({
        name: {
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

module.exports = Services;