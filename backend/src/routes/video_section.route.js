const express = require("express");

const videoSectionRouter = express.Router();

const VideoSectionController = require("../controllers/VideoSectionController");

videoSectionRouter.get("/", VideoSectionController.browse);
videoSectionRouter.get("/:id", VideoSectionController.read);

videoSectionRouter.delete("/:id", VideoSectionController.destroy);

module.exports = videoSectionRouter;
