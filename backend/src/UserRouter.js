const express = require("express");

const UserRouter = express.Router();

const itemControllers = require("./controllers/itemControllers");

UserRouter.get("/user", itemControllers.browse);
UserRouter.get("/user/:id", itemControllers.read);
UserRouter.put("/user/:id", itemControllers.edit);
UserRouter.post("/user", itemControllers.add);
UserRouter.delete("/user/:id", itemControllers.destroy);

module.exports = UserRouter;
