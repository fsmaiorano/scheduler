const express = require("express");
const requireDir = require("require-dir");

const routes = express.Router();
const controllers = requireDir("./controllers");

const authMiddleware = require("./middlewares/auth");

// Authentication
routes.post("/signup", controllers.authController.signup);
routes.post("/signin", controllers.authController.signin);

// Auth Middleware
// routes.use(authMiddleware);

module.exports = routes;
