const express = require("express");
// const auth = require("../utils/Auth");

const nodeMailerRoute = express.Router();

const nodeMailerContact = require("../controllers/nodeMailerContact");

nodeMailerRoute.get("/", nodeMailerContact.initialize);
// nodeMailerRoute.post("/", nodeMailerContact.add);

module.exports = nodeMailerRoute;
