const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.feedback = require("./feedback.model");
db.notification = require("./notification.model");
db.user = require("./user.model");
db.player = require("./player.model");
db.role = require("./role.model");
db.order = require("./order.model");
db.partner = require("./partner.model");
db.service = require("./service.model");
db.subservice = require("./subservice.model");

db.ROLES = ["user", "participant", "admin"];

module.exports = db;