"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var UserModel_1 = __importDefault(require("../models/UserModel"));
var connUri = process.env.MONGO_LOCAL_CONN_URL;
var UserController = /** @class */ (function () {
    function UserController() {
    }
    UserController.prototype.addUser = function (req, res) {
        var newUser = new UserModel_1.default(req.body);
        mongoose_1.default.connect(connUri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, }, function (err) {
            var result = { status: 0, result: null, error: null };
            var status = 201;
            if (!err) {
                var user = new UserModel_1.default();
                user.name = newUser.name;
                user.password = newUser.password;
                user.save(function (err, user) {
                    if (!err) {
                        result.status = status;
                        result.result = user;
                    }
                    else {
                        status = 500;
                        result.status = status;
                        result.error = err;
                    }
                    res.status(status).send(result);
                });
            }
            else {
                status = 500;
                result.status = status;
                result.error = err;
                res.status(status).send(result);
            }
        });
    };
    UserController.prototype.getAllUsers = function (req, res) {
        res.status(200).send([{ "user": "Bob" }, { "user": "Jane" }, { "user": "Jade" }]);
        //mongoose.connect(connUri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, }, (err) => { })
    };
    return UserController;
}());
exports.default = new UserController();
// export = {
//   add: (req, res) => {
//     mongoose.connect(connUri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, }, (err) => {
//       let result = { status: 0, result: 0, error: "" };
//       let status = 201;
//       if (!err) {
//         const name = req.body.name;
//         const password = req.body.password;
//         let user = new User();
//         user.name = name;
//         user.password = password;
//         user.save((err, user) => {
//           if (!err) {
//             result.status = status;
//             result.result = user;
//           } else {
//             status = 500;
//             result.status = status;
//             result.error = err;
//           }
//           res.status(status).send(result);
//         });
//       } else {
//         status = 500;
//         result.status = status;
//         result.error = err;
//         res.status(status).send(result);
//       }
//     });
//   },
//   updateUser: (req, res) => {
//     mongoose.connect(connUri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, }, (err) => {
//       let result = { status: 0, result: 0, error: "" };
//       let status = 201;
//       if (!err) {
//         const { name, password, firstName, lastName, email, status } = req.body;
//         let user = new User();
//         user.name = name;
//         user.password = password;
//         user.firstName = firstName;
//         user.lastName = lastName;
//         user.email = email;
//         user.status = status;
//         User.findOneAndUpdate({ name: name }, user, { new: true });
//       } else {
//         status = 500;
//         result.status = status;
//         result.error = err;
//         res.status(status).send(result);
//       }
//     })
//       .catch((err) => {
//         status = 500;
//         console.log(err);
//         result.status = status;
//         result.error = err;
//         res.status(status).send(result);
//       });
//   },
//   login: (req, res) => {
//     const { name, password } = req.body;
//     mongoose.connect(connUri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, }, (err) => {
//       let result = {};
//       let status = 200;
//       if (!err) {
//         User.findOne({ name }, (err, user) => {
//           if (!err && user) {
//             // We could compare passwords in our model instead of below as well
//             bcrypt.compare(password, user.password).then(match => {
//               if (match) {
//                 status = 200;
//                 // Create a token
//                 const payload = { user: user.name };
//                 const options = { expiresIn: '2d', issuer: 'http://localhost' };
//                 const secret = process.env.JWT_SECRET;
//                 const token = jwt.sign(payload, secret, options);
//                 // console.log('TOKEN', token);
//                 result.token = token;
//                 result.status = status;
//                 result.result = user;
//               } else {
//                 status = 401;
//                 result.status = status;
//                 result.error = `Authentication error`;
//               }
//               res.status(status).send(result);
//             }).catch(err => {
//               status = 500;
//               result.status = status;
//               result.error = err;
//               res.status(status).send(result);
//             });
//           } else {
//             status = 404;
//             result.status = status;
//             result.error = err;
//             res.status(status).send(result);
//           }
//         });
//       } else {
//         status = 500;
//         result.status = status;
//         result.error = err;
//         res.status(status).send(result);
//       }
//     });
//   },
//   getAll: (req, res) => {
//     mongoose.connect(connUri, { useNewUrlParser: true }, (err) => {
//       let result = {};
//       let status = 200;
//       if (!err) {
//         const payload = req.decoded;
//         if (payload && payload.user === 'admin') {
//           User.find({}, (err, users) => {
//             if (!err) {
//               result.status = status;
//               result.error = err;
//               result.result = users;
//             } else {
//               status = 500;
//               result.status = status;
//               result.error = err;
//             }
//             res.status(status).send(result);
//           });
//         } else {
//           status = 401;
//           result.status = status;
//           result.error = `Authentication error`;
//           res.status(status).send(result);
//         }
//       } else {
//         status = 500;
//         result.status = status;
//         result.error = err;
//         res.status(status).send(result);
//       }
//     });
//   },
// }
//# sourceMappingURL=UserController.js.map