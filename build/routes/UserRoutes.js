"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var UserController_1 = __importDefault(require("../controllers/UserController"));
var ValidateToken_1 = __importDefault(require("../utils/ValidateToken"));
exports.default = (function (router) {
    router.route('/users')
        .post(UserController_1.default.addUser)
        // .put(UserController.updateUser)
        .get(ValidateToken_1.default.validateToken, UserController_1.default.getAllUsers);
    // .get(UserController.getAllUsers);
    // router.route('/login')
    // .post(UserController.login);
});
//# sourceMappingURL=UserRoutes.js.map