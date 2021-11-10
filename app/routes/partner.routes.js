const { authJwt, verifyEmail } = require("../middlewares");
const controller = require("../controllers/partner.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.get(
        "/api/v1/partner/service/:service/subservice/:subservice/city/:city", [],
        controller.findBySubserviceAndCity
    );
    app.get(
        "/api/v1/partner/:id", [],
        controller.find
    );
    app.get(
        "/api/v1/partner/user/:id", [],
        controller.findByUser
    );
    app.post(
        "/api/v1/partner/user/:id/certificate", [],
        controller.addCertificate
    );
};