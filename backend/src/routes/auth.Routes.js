const express = require("express");
const authRouter = express.Router();
const authControllers = require("../controllers/auth.Controller");
const authMiddleware = require("../middleware/auth.middleware");
const { uploadProfilePicture } = require("../middleware/file.middleware");

authRouter.post("/register", authControllers.registerUser);
authRouter.post("/login", authControllers.loginUser);
authRouter.post("/logout", authControllers.logoutUser);

authRouter.get("/get-me", authMiddleware.authUser, authControllers.getMeUser);
authRouter.put(
  "/update-me",
  authMiddleware.authUser,
  uploadProfilePicture.single("profilePicture"),
  authControllers.updateMeUser,
);

module.exports = authRouter;
