import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import ILoginResult from "./ILoginResult";
import UserModel, { IUserModel } from "../../models/UserModel";

class UserData {
    private connUri: string;

    constructor() {
        this.connUri = process.env.MONGO_LOCAL_CONN_URL;
    }

    public async login(name: string, password: string) {
        let result: ILoginResult = {
            status: 0,
            result: null,
            error: "",
            token: ""
        };
        let status = 200;

        try {
            await mongoose.connect(this.connUri, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true
            });
            const user = await UserModel.findOne({ name });
            await mongoose.disconnect();

            let match = await bcrypt
                .compare(password, user.password)
                .catch(() => false);
            if (!match) {
                status = 401;
                result.status = status;
                result.error = `Authentication error`;
                return result;
            }
            status = 200;
            // Create a token
            const payload = { user: user.name };
            const options = { expiresIn: "2d", issuer: "http://localhost" };
            const secret = process.env.JWT_SECRET;
            const token = jwt.sign(payload, secret, options);

            result.token = token;
            result.status = status;
            result.result = user;
            return result;
        } catch (e) {
            status = 500;
            result.status = status;
            result.error = e.toString();
            return result;
        }
    }

    public async getAllUsers(payload) {
        let result: ILoginResult = {
            status: 0,
            result: null,
            error: "",
            token: ""
        };
        let status = 200;
        try {
            if (payload.user === "admin") {
                await mongoose.connect(this.connUri, { useNewUrlParser: true });
                let userList = await UserModel.find({});
                result.status = status;
                result.result = userList;
                await mongoose.disconnect();
                return result;
            } else {
                await mongoose.disconnect();
                status = 401;
                result.status = status;
                result.error = `Authentication error`;
                return result;
            }
        } catch (e) {
            status = 500;
            result.status = status;
            result.error = e.toString();
            return result;
        }
    }

    public async createNewUser(newUser: IUserModel) {
        let result: ILoginResult = {
            status: 0,
            result: null,
            error: "",
            token: ""
        };
        let status = 201;

        try {
            let test = process.env.MONGO_LOCAL_CONN_URL;
            await mongoose.connect(this.connUri, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true
            });
            let user = new UserModel();
            user.name = newUser.name;
            user.password = newUser.password;

            await user.save();
            result.status = status;
            result.result = user;
            await mongoose.disconnect();

            return result;
        } catch (e) {
            status = 500;
            result.status = status;
            result.error = e.toString();
            return result;
        }
    }

    public async updateUser(user: IUserModel) {
        let result: ILoginResult = {
            status: 0,
            result: null,
            error: "",
            token: ""
        };
        let status = 201;

        try {
            await mongoose.connect(this.connUri, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true
            });
            const oldUser = await UserModel.findOne({ name: user.name });
            oldUser.name = user.name || oldUser.name;
            oldUser.set('password', user.password || oldUser.password);
            oldUser.firstName = user.firstName || oldUser.firstName;
            oldUser.lastName = user.lastName || oldUser.lastName;
            oldUser.email = user.email || oldUser.email;
            oldUser.status = user.status || oldUser.status;

            await oldUser.save();
            result.status = status;
            result.result = oldUser;
            await mongoose.disconnect();

            return result;
        } catch (e) {
            status = 500;
            result.status = status;
            result.error = e.toString();
            return result;
        }
    }
}

export default new UserData();
