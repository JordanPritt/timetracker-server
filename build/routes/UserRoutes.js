"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var UserController_1 = __importDefault(require("../controllers/UserController"));
var ValidateToken_1 = __importDefault(require("../utils/ValidateToken"));
exports.default = (function (router) {
    router
        .route("/users")
        .post(UserController_1.default.addUser)
        .put(ValidateToken_1.default.validateToken, UserController_1.default.updateUser)
        .get(ValidateToken_1.default.validateToken, UserController_1.default.getAllUsers);
    // .get(UserController.getAllUsers);
    router.route("/login").post(UserController_1.default.loginUser);
    router.route("/account").get(ValidateToken_1.default.validateToken, UserController_1.default.getAccountDetails);
});
//# sourceMappingURL=UserRoutes.js.map