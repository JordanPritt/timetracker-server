"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importStar(require("mongoose"));
var bcrypt_1 = require("bcrypt");
var config_json_1 = __importDefault(require("../config.json"));
var UserSchema = new mongoose_1.Schema({
    name: {
        type: 'String',
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: 'String',
        required: true,
        trim: true
    },
    firstName: {
        type: 'String',
        required: false,
        trim: true
    },
    lastName: {
        type: 'String',
        required: false,
        trim: true
    },
    email: {
        type: 'String',
        required: false,
        trim: true
    },
    status: {
        type: 'String',
        required: false,
        trim: true
    },
});
// encrypt password before save
UserSchema.pre('save', function (next) {
    var user = this;
    if (!user.isModified) { // don't rehash if it's an old user
        next();
    }
    else {
        bcrypt_1.hash(user.password, config_json_1.default.saltingRounds, function (err, hash) {
            if (err) {
                console.log('Error hashing password for user', user.name);
                next(err);
            }
            else {
                user.password = hash;
                next();
            }
        });
    }
});
exports.default = mongoose_1.default.model('User', UserSchema);
//# sourceMappingURL=UserModel.js.map