const express = require("express");

const videoRoute = express.Router();

const VideoController = require("../controllers/VideoController");

videoRoute.get("/", VideoController.browse);
videoRoute.get("/:id", VideoController.read);
videoRoute.put("/:id", VideoController.edit);
videoRoute.post("/", VideoController.add);
videoRoute.delete("/:id", VideoController.destroy);

module.exports = videoRoute;
