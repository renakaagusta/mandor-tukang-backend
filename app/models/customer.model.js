const mongoose = require("mongoose");

const Customer = mongoose.model(
    "Customer",
    new mongoose.Schema({
        user: {
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

module.exports = Customer;