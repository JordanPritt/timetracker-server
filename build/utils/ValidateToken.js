"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.default = {
    validateToken: function (req, res, next) {
        var authorizationHeader = req.headers.authorization;
        var result;
        if (authorizationHeader) {
            var token = req.headers.authorization.split(' ')[1]; // Bearer <token>
            var options = {
                expiresIn: '1d',
                issuer: 'http://localhost'
            };
            try {
                // verify makes sure that the token hasn't expired and has been issued by us
                result = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, options);
                // Let's pass back the decoded token to the request object
                req.decoded = result;
                // We call next to pass execution to the subsequent middleware
                next();
            }
            catch (err) {
                // Throw an error just in case anything goes wrong with verification
                throw new Error(err);
            }
        }
        else {
            result = {
                error: "Authentication error. Token required.",
                status: 401
            };
            res.status(401).send(result);
        }
    }
};
//# sourceMappingURL=ValidateToken.js.map