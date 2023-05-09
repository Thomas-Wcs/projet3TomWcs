const express = require("express");

const sectionRoute = express.Router();

const SectionController = require("../controllers/SectionController");

sectionRoute.get("/", SectionController.browse);
sectionRoute.get("/:id", SectionController.read);
sectionRoute.post("/", SectionController.add);
sectionRoute.put("/:id", SectionController.edit);
sectionRoute.delete("/:id", SectionController.destroy);

module.exports = sectionRoute;
