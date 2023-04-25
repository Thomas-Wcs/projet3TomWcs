const express = require("express");

const sectionRoute = express.Router();

const SectionController = require("../controllers/SectionController");

sectionRoute.get("/", SectionController.browse);

module.exports = sectionRoute;
