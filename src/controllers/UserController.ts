import { Response, Request } from "express";
import UserData from "../data/Users/UserData";
import AccountData, { IDetails } from "../data/Account/AccountData";
import UserSchema, { IUserModel } from "../models/UserModel";
import ILoginResult from "../data/Users/ILoginResult";

class UserController {
  public async addUser(req: Request, res: Response) {
    let newUser: IUserModel = new UserSchema(req.body);
    let result: ILoginResult = await UserData.createNewUser(newUser);
    res.status(result.status).send(result.result);
  }

  public async loginUser(req: Request, res: Response) {
    const { name, password } = req.body;
    let result: ILoginResult = await UserData.login(name, password);
    res.status(result.status).send(result.result);
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
      let details: IDetails = await AccountData.getAccountDetails(user.name);
      res.status(200).send(details);
    } catch (e) {
      let test = e;
      return null;
    }
  }
}

export default new UserController();
