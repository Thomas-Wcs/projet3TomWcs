const express = require("express");

const router = express.Router();

const user = require("./userRouter");
const videos = require("./videosRouter");

router.use("/users", user);
router.use("/videos", videos);

module.exports = router;
