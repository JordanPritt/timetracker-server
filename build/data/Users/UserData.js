"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt_1 = __importDefault(require("bcrypt"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var mongoose_1 = __importDefault(require("mongoose"));
var UserModel_1 = __importDefault(require("../../models/UserModel"));
var UserData = /** @class */ (function () {
    function UserData() {
        this.connUri = process.env.MONGO_LOCAL_CONN_URL;
    }
    UserData.prototype.login = function (name, password) {
        return __awaiter(this, void 0, void 0, function () {
            var result, status, user, match, payload, options, secret, token, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = {
                            status: 0,
                            result: null,
                            error: "",
                            token: ""
                        };
                        status = 200;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        return [4 /*yield*/, mongoose_1.default.connect(this.connUri, {
                                useNewUrlParser: true,
                                useUnifiedTopology: true,
                                useCreateIndex: true
                            })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, UserModel_1.default.findOne({ name: name })];
                    case 3:
                        user = _a.sent();
                        return [4 /*yield*/, mongoose_1.default.disconnect()];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, bcrypt_1.default
                                .compare(password, user.password)
                                .catch(function () { return false; })];
                    case 5:
                        match = _a.sent();
                        if (!match) {
                            status = 401;
                            result.status = status;
                            result.error = "Authentication error";
                            return [2 /*return*/, result];
                        }
                        status = 200;
                        payload = { user: user.name };
                        options = { expiresIn: "2d", issuer: "http://localhost" };
                        secret = process.env.JWT_SECRET;
                        token = jsonwebtoken_1.default.sign(payload, secret, options);
                        result.token = token;
                        result.status = status;
                        result.result = user;
                        return [2 /*return*/, result];
                    case 6:
                        e_1 = _a.sent();
                        status = 500;
                        result.status = status;
                        result.error = e_1.toString();
                        return [2 /*return*/, result];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    UserData.prototype.getAllUsers = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            var result, status, userList, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = {
                            status: 0,
                            result: null,
                            error: "",
                            token: ""
                        };
                        status = 200;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 8, , 9]);
                        if (!(payload.user === "admin")) return [3 /*break*/, 5];
                        return [4 /*yield*/, mongoose_1.default.connect(this.connUri, { useNewUrlParser: true })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, UserModel_1.default.find({})];
                    case 3:
                        userList = _a.sent();
                        result.status = status;
                        result.result = userList;
                        return [4 /*yield*/, mongoose_1.default.disconnect()];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, result];
                    case 5: return [4 /*yield*/, mongoose_1.default.disconnect()];
                    case 6:
                        _a.sent();
                        status = 401;
                        result.status = status;
                        result.error = "Authentication error";
                        return [2 /*return*/, result];
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        e_2 = _a.sent();
                        status = 500;
                        result.status = status;
                        result.error = e_2.toString();
                        return [2 /*return*/, result];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    UserData.prototype.createNewUser = function (newUser) {
        return __awaiter(this, void 0, void 0, function () {
            var result, status, test, user, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = {
                            status: 0,
                            result: null,
                            error: "",
                            token: ""
                        };
                        status = 201;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        test = process.env.MONGO_LOCAL_CONN_URL;
                        return [4 /*yield*/, mongoose_1.default.connect(this.connUri, {
                                useNewUrlParser: true,
                                useUnifiedTopology: true,
                                useCreateIndex: true
                            })];
                    case 2:
                        _a.sent();
                        user = new UserModel_1.default();
                        user.name = newUser.name;
                        user.password = newUser.password;
                        return [4 /*yield*/, user.save()];
                    case 3:
                        _a.sent();
                        result.status = status;
                        result.result = user;
                        return [4 /*yield*/, mongoose_1.default.disconnect()];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, result];
                    case 5:
                        e_3 = _a.sent();
                        status = 500;
                        result.status = status;
                        result.error = e_3.toString();
                        return [2 /*return*/, result];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    UserData.prototype.updateUser = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var result, status, oldUser, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = {
                            status: 0,
                            result: null,
                            error: "",
                            token: ""
                        };
                        status = 201;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        return [4 /*yield*/, mongoose_1.default.connect(this.connUri, {
                                useNewUrlParser: true,
                                useUnifiedTopology: true,
                                useCreateIndex: true
                            })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, UserModel_1.default.findOne({ name: user.name })];
                    case 3:
                        oldUser = _a.sent();
                        oldUser.name = user.name || oldUser.name;
                        oldUser.set('password', user.password || oldUser.password);
                        oldUser.firstName = user.firstName || oldUser.firstName;
                        oldUser.lastName = user.lastName || oldUser.lastName;
                        oldUser.email = user.email || oldUser.email;
                        oldUser.status = user.status || oldUser.status;
                        return [4 /*yield*/, oldUser.save()];
                    case 4:
                        _a.sent();
                        result.status = status;
                        result.result = oldUser;
                        return [4 /*yield*/, mongoose_1.default.disconnect()];
                    case 5:
                        _a.sent();
                        return [2 /*return*/, result];
                    case 6:
                        e_4 = _a.sent();
                        status = 500;
                        result.status = status;
                        result.error = e_4.toString();
                        return [2 /*return*/, result];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    return UserData;
}());
exports.default = new UserData();
//# sourceMappingURL=UserData.js.map