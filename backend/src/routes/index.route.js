const express = require("express");

const router = express.Router();

const user = require("./userRouter");
const videos = require("./video.route");

const adverts = require("./adverts.route");

router.use("/users", user);
router.use("/videos", videos);
router.use("/adverts", adverts);

module.exports = router;
