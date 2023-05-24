const express = require("express");

const categorieRouter = express.Router();

const CategorieController = require("../controllers/CategorieController");

categorieRouter.get("/", CategorieController.browse);
categorieRouter.post("/", CategorieController.add);
categorieRouter.delete("/:id", CategorieController.destroy);

module.exports = categorieRouter;
