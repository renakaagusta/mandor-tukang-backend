var fire = require("firebase-admin");

var serviceAccount = require("./mandor-tukang-firebase-adminsdk-mwg85-69f98c1581.json");

if (fire.apps.length === 0) {
    fire.initializeApp({
        credential: fire.credential.cert(serviceAccount)
    });
}

module.exports = fire