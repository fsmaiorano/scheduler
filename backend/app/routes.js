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
routes.post("/calendar/share", authMiddleware, controllers.calendarController.share);
routes.get("/calendar/getEvents", authMiddleware, controllers.calendarController.getEvents);
routes.get("/calendar/delete/:id", authMiddleware, controllers.calendarController.delete);

module.exports = routes;
