const express = require("express");

const router = express.Router();

const user = require("./userRouter");
const videos = require("./video.route");

router.use("/users", user);
router.use("/videos", videos);

module.exports = router;
