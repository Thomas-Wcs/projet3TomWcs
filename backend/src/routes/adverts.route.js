const express = require("express");

const advertsRouter = express.Router();

const advertsController = require("../controllers/advertsController");

advertsRouter.get("/", advertsController.browse);
advertsRouter.get("/:id", advertsController.read);
advertsRouter.put("/:id", advertsController.edit);
advertsRouter.post("/", advertsController.add);
advertsRouter.delete("/:id", advertsController.destroy);

module.exports = advertsRouter;
