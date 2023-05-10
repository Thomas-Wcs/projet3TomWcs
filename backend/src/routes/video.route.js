const express = require("express");
const multer = require("multer");
const path = require("path");
const auth = require("../utils/Auth");

const uploadFolder = path.join(__dirname, "../../public/assets/videos");

const upload = multer({ dest: uploadFolder });
const videoRoute = express.Router();

const VideoController = require("../controllers/VideoController");

videoRoute.get("/", VideoController.browse);
videoRoute.get("/:id", VideoController.read);
videoRoute.use(auth.verifyToken);
videoRoute.put("/:id", VideoController.edit);
videoRoute.post("/", upload.single("link"), VideoController.add);
videoRoute.delete("/:id", VideoController.destroy);

module.exports = videoRoute;
