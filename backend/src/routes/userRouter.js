const express = require("express");

const userRouter = express.Router();

const userController = require("../controllers/userController");

userRouter.get("/", userController.browse);
userRouter.get("/:id", userController.read);
userRouter.put("/:id", userController.edit);
userRouter.post("/", userController.add);
userRouter.delete("/:id", userController.destroy);

module.exports = userRouter;
