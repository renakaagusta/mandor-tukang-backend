const { authJwt, verifyEmail } = require("../middlewares");
const controller = require("../controllers/player.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.get(
        "/api/v1/player", [authJwt.verifyToken, verifyEmail.checkEmail],
        (req, res, next) => {
            if (req.query.limit) controller.indexByPage(req, res);
            else controller.index(req, res);
        }
    );

    app.get(
        "/api/v1/player/:id", [authJwt.verifyToken, verifyEmail.checkEmail],
        controller.view
    );
    app.post(
        "/api/v1/player", [authJwt.verifyToken, authJwt.isAdmin, verifyEmail.checkEmail],
        controller.create
    );
    app.put(
        "/api/v1/player/:id", [authJwt.verifyToken, authJwt.isAdmin, verifyEmail.checkEmail],
        controller.update
    );
    app.delete(
        "/api/v1/player/:id", [authJwt.verifyToken, authJwt.isAdmin, verifyEmail.checkEmail],
        controller.delete
    );
};