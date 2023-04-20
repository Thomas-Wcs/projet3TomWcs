const express = require("express");

const userRouter = express.Router();
const auth = require("../utils/Auth");

const userController = require("../controllers/userController");

userRouter.get("/", userController.browse);
userRouter.get("/:id", userController.read);
userRouter.put("/:id", userController.edit);
userRouter.post("/", userController.add);
userRouter.delete("/:id", userController.destroy);
userRouter.post("/login", userController.login, auth.verifyPassword);

module.exports = userRouter;
