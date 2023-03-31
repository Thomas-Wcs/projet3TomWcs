const express = require("express");

const router = express.Router();

const video = require("./video.route");
const item = require("./router");
const itemController = require("../controllers/itemControllers");

router.use("/videos", video);
router.use("/item", item);
router.get("/item", itemController.browse);

module.exports = router;
