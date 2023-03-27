const express = require("express");

const UserRouter = express.Router();

const itemControllers = require("../controllers/itemControllers");

UserRouter.get("/", itemControllers.browse);
UserRouter.get("/:id", itemControllers.read);
UserRouter.put("/:id", itemControllers.edit);
UserRouter.post("/", itemControllers.add);
UserRouter.delete("/:id", itemControllers.destroy);

module.exports = UserRouter;
