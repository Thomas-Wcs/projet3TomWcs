const express = require("express");

const router = express.Router();
const item = require("./router");
const user = require("./userRouter");
const videos = require("./videosRouter");

router.use("/items", item);
router.use("/users", user);
router.use("/videos", videos);

module.exports = router;
