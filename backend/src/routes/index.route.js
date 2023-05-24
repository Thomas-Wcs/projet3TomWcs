const express = require("express");

const router = express.Router();

const user = require("./userRouter");
const videos = require("./video.route");
const sections = require("./section.route");
const videosUser = require("./videos_user.route");

router.use("/users", user);
router.use("/videos", videos);
router.use("/sections", sections);
router.use("/videosUser", videosUser);

module.exports = router;
