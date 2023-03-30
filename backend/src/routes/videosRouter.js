const express = require("express");

const videosRouter = express.Router();

const videosController = require("../controllers/videosControllers");

videosRouter.get("/", videosController.browse);
videosRouter.get("/:id", videosController.read);
videosRouter.put("/:id", videosController.edit);
videosRouter.post("/", videosController.add);
videosRouter.delete("/:id", videosController.destroy);

module.exports = videosRouter;
