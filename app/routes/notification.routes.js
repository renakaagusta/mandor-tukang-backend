const { authJwt, verifyEmail } = require("../middlewares");
const controller = require("../controllers/notification.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.get(
        "/api/v1/notification/user/:userId", [],
        controller.findByUser
    );
    /*app.get(
        "/api/v1/notification/user/:userId/unread", [],
        controller.findUnreadByUser
    );
    app.post(
        "/api/v1/notification/user/:userId", [],
        controller.readAll
    );    
    app.post(
        "/api/v1/notification/:id", [],
        controller.read
    );*/
};