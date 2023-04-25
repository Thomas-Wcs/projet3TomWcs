const express = require("express");

const router = express.Router();

const user = require("./userRouter");
const videos = require("./video.route");
const sections = require("./section.route");

router.use("/users", user);
router.use("/videos", videos);
router.use("/sections", sections);

module.exports = router;
