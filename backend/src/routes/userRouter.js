const express = require("express");

const userRouter = express.Router();
const auth = require("../utils/Auth");

const userController = require("../controllers/userController");

userRouter.get("/", userController.browse);
userRouter.get("/name", userController.findOne);

userRouter.get("/:id", userController.read);
userRouter.put("/:id", userController.edit);
userRouter.post("/", userController.add);

userRouter.post("/login", userController.login, auth.verifyPassword);

userRouter.use(auth.verifyToken);
userRouter.delete("/:id", userController.destroy);

module.exports = userRouter;
