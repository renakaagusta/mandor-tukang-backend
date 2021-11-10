const mongoose = require("mongoose");

const Payment = mongoose.model(
    "Payment",
    new mongoose.Schema({
        invoice_number: {
            type: String,
        },
        method: {
            type: String,
        },
        status: {
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

module.exports = User;