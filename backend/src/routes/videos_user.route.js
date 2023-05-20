const express = require("express");

const videosUserRoute = express.Router();

const videosUserController = require("../controllers/Videos_userController");

videosUserRoute.get("/:id", videosUserController.read);
videosUserRoute.delete("/:id", videosUserController.destroy);

module.exports = videosUserRoute;
