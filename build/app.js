"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var body_parser_1 = __importDefault(require("body-parser"));
var Routes_1 = __importDefault(require("./routes/Routes"));
var cors_1 = __importDefault(require("cors"));
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var App = /** @class */ (function () {
    function App() {
        this.app = express_1.default();
        this.router = express_1.default.Router();
        this.config();
    }
    App.prototype.config = function () {
        this.app.use(cors_1.default());
        this.app.use(body_parser_1.default.json());
        this.app.use(body_parser_1.default.urlencoded({
            extended: true
        }));
        this.app.use("/api/v1", Routes_1.default(this.router));
        this.app.use(morgan_1.default("dev"));
    };
    return App;
}());
exports.default = new App().app;
//# sourceMappingURL=app.js.map