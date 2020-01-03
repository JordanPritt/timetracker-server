import { Response, Request } from "express";
import UserData from "../data/Users/UserData";
import AccountData, { IDetails } from "../data/Account/AccountData";
import UserSchema, { IUserModel } from "../models/UserModel";
import ILoginResult from "../data/Users/ILoginResult";
import UserModel from "../models/UserModel";

class UserController {
  public async addUser(req: Request, res: Response) {
    try {
      let newUser: IUserModel = new UserSchema(req.body);
      let result: ILoginResult = await UserData.createNewUser(newUser);
      res.status(result.status).send(result.result);
    } catch (e) {
      res.status(500).send({ error: e.toString() });
    }
  }

  public async loginUser(req: Request, res: Response) {
    try {
      const { name, password } = req.body;
      let result: ILoginResult = await UserData.login(name, password);
      res.status(result.status).send(result.result);
    } catch (e) {
      res.status(500).send({ error: e.toString() });
    }
  }

  public async updateUser(req: Request, res: Response) {
    try {
      const { name, password, firstName, lastName, email, status } = req.body;
      const user: IUserModel = new UserModel();
      user.name = name;
      user.password = password;
      user.firstName = firstName;
      user.lastName = lastName;
      user.email = email;
      user.status = status;
      let result: ILoginResult = await UserData.updateUser(user);
      res.status(result.status).send(result.result);
    } catch (e) {
      res.status(500).send({ error: e.toString() });
    }
  }

  public async getAllUsers(req: Request, res: Response) {
    try {
      const payload = req["decoded"];
      if (payload) {
        let users: ILoginResult = await UserData.getAllUsers(payload);
        res.status(users.status).send(users.result);
      }
    } catch (e) {
      res.status(500).send({ error: e.toString() });
    }
  }

  public async getAccountDetails(req: Request, res: Response) {
    try {
      const user = req["decoded"];
      let details: IDetails = await AccountData.getAccountDetails(user.user);
      res.status(200).send(details);
    } catch (e) {
      let err = e.toString();
      res.status(500).send({ error: err });
    }
  }
}

export default new UserController();
