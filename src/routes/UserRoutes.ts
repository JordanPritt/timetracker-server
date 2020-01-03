import express from "express";
import UserController from "../controllers/UserController";
import valid from "../utils/ValidateToken";

export default (router: express.Router) => {
  router
    .route("/users")
    .post(UserController.addUser)
    // .put(UserController.updateUser)
    .get(valid.validateToken, UserController.getAllUsers);
  // .get(UserController.getAllUsers);

  router.route("/login").post(UserController.loginUser);
  router.route("/account").get(UserController.getAccountDetails);
};
