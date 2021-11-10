

const controller = require("../controllers/midtrans.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, auth-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post(
        "/charge", [
            
        ],
        controller.charge
    );
    app.post(
        "/notification", [
        ],
        controller.notification
    );
    app.get(
        "/status/:id", [
        ],
        controller.status
    );
    app.get(
        "/approve/:id", [
        ],
        controller.status
    );
};