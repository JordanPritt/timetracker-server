"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var morgan_1 = __importDefault(require("morgan"));
var config_json_1 = __importDefault(require("./config.json"));
var app_1 = __importDefault(require("./app"));
var message = { "message": "Hello World" };
app_1.default.get("/", function (req, res) {
    res.send(message);
});
app_1.default.listen("" + config_json_1.default.port, function () {
    morgan_1.default(process.env.NODE_ENV);
    morgan_1.default("Server now listening at localhost:" + config_json_1.default.port);
});
exports.default = app_1.default;
//# sourceMappingURL=index.js.map