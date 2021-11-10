const mongoose = require("mongoose");

const Feedback = mongoose.model(
    "Feedback",
    new mongoose.Schema({
        order: {
            type: String
        },
        rating: {
            type: String
        },
        review: {
            type: String
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

module.exports = Feedback;