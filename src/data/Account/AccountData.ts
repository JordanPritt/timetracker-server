import mongoose from "mongoose";
import UserModel, { IUserModel } from "../../models/UserModel";

export interface IDetails {
  firstName: string;
  lastName: string;
  email: string;
  status: string;
}

class AccountData {
  private connUri: string;

  constructor() {
    this.connUri = process.env.MONGO_LOCAL_CONN_URL;
  }

  public async getAccountDetails(name: string) {
    let accountDetails: IDetails = {
      firstName: "",
      lastName: "",
      email: "",
      status: ""
    };
    try {
      await mongoose.connect(this.connUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
      });
      const user = await UserModel.findOne({ name: name });
      await mongoose.disconnect();

      accountDetails.firstName = user.firstName;
      accountDetails.lastName = user.lastName;
      accountDetails.email = user.email;
      accountDetails.status = user.status;

      return accountDetails;
    } catch (e) {
      return null;
    }
  }
}

export default new AccountData();
