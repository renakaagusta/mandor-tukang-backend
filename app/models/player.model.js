const mongoose = require("mongoose");

const Player = mongoose.model(
    "Player",
    new mongoose.Schema({
        "ID": String,
        "Name": String,
        "Age": String,
        "OVA": String,
        "Nationality": String,
        "Club": String,
        "BOV": String,
        "BP": String,
        "Position": String,
        "Player Photo": String,
        "Club Logo": String,
        "Flag Photo": String,
        "POT": String,
        "Team & Contract": String,
        "Height": String,
        "Weight": String,
        "foot": String,
        "Growth": String,
        "Joined": String,
        "Loan Date End": String,
        "Value": String,
        "Wage": String,
        "Release Clause": String,
        "Contract": String,
        "Gender": String,
        updated_at: {
            type: Date,
            default: Date.now(),
        },
    })
);

module.exports = Player;