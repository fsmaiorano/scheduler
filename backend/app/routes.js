const express = require("express");
const requireDir = require("require-dir");

const routes = express.Router();
const controllers = requireDir("./controllers");

const authMiddleware = require("./middlewares/auth");

// Authentication
routes.post("/signup", controllers.authController.signup);
routes.post("/signin", controllers.authController.signin);

// Profile
routes.post("/update", authMiddleware, controllers.profileController.update);

// Calendar
routes.post("/calendar/add", authMiddleware, controllers.calendarController.add);

// Auth Middleware
// routes.use(authMiddleware);

module.exports = routes;
