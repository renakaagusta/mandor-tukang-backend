const mongoose = require("mongoose");

const Order = mongoose.model(
    "Order",
    new mongoose.Schema({
        service: {
            type: String,
        },
        subservice: {
            type: String,
        },
        customerId: {
            type: String,
        },
        partnerId: {
            type: String,
        },
        description: {
            type: String,
        },
        location: {
            description: String,
            latitude: Number,
            longitude: Number,
        },
        date: {
            type: String,
        },
        time: {
            type: String,
        },
        status: {
            default: 0,
            type: String,
        },
        images: [{
            url: String,
        }],
        payment:{
            survey: {
                id: {
                    type: String,
                },
                items: [],
                status: {
                    default: 0,
                    type: Number,
                },
            },
            proccess: {
                id: {
                    type: String,
                },
                items: [],
                status: {
                    default: 0,
                    type: Number,
                },
            },
        },
        materials: [{
            name: String,
            description: String,
            quantity: Number,
            price: Number,
        }],
        relatives: [{
            id: String,
            description: String,
        }],
        chats: [{
            to: String,
            content: String,
            type: String,
            created_at: String,
            read_at: String,
        }],
        created_at: {
            type: String,
            default: '',
        },
        updated_at: {
            type: Date,
            default: Date.now(),
        },
    })
);

module.exports = Order;