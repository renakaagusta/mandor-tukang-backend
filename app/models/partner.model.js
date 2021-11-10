const mongoose = require("mongoose");

const Partner = mongoose.model(
    "Partner",
    new mongoose.Schema({
        user: {
            type: String,
        },
        location: {
            address: String, 
            latitude: Number,
            longitude: Number,
            province: String,
            city: String,
        },
        service: {
            type: String,
        },
        subservices: [{
            type: String,
        }],
        certificates: [{
            name: String,
            description: String,
            last_year: Number,
            publisher: String,
            status: {
                type: Number,
                default: 0,
            }
        }],
        verification: {
            type: Number,
            default: 0,
        },
        rating: {
            average: {
                type: Number,
                default: 0,
            },
            quantity: {
                type: Number,
                default: 0,
            },
            rates: [{
                type: String,
            }]
        },
        role: {
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

module.exports = Partner;