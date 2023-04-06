const express = require("express");

const router = express.Router();

const video = require("./video.route");

router.use("/videos", video);

module.exports = router;
