const { authJwt, verifyEmail } = require("../middlewares");
const controller = require("../controllers/order.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post(
        "/api/v1/order", [],
        controller.create
    );
    app.get(
        "/api/v1/order/:id", [],
        controller.findById
    );
    app.post(
        "/api/v1/order/:id/chat", [],
        controller.createChat
    );
    app.get(
        "/api/v1/order/customer/:customerId/status/:status", [],
        controller.findCustomerOrderByStatus
    );
    app.get(
        "/api/v1/order/partner/:partnerId/status/:status", [],
        controller.findPartnerOrderByStatus
    );
    app.post(
        "/api/v1/order/:id/accept", [],
        controller.accept
    );
    app.post(
        "/api/v1/order/:id/refuse", [],
        controller.findPartnerOrderByStatus
    );
    app.post(
        "/api/v1/order/:id/add-survey-data", [],
        controller.addSurveyData
    );
    app.put(
        "/api/v1/order/:id/review", [],
        controller.addSurveyData
    );
    
};