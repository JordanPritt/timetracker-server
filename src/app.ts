import bodyParser from "body-parser";
import Routes from "./routes/Routes";
import cors from "cors";
import express, { Router } from "express";
import morgan from "morgan";

class App {
  public app: express.Application;
  public router: express.Router;

  constructor() {
    this.app = express();
    this.router = express.Router();
    this.config();
  }

  private config(): void {
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(
      bodyParser.urlencoded({
        extended: true
      })
    );
    this.app.use("/api/v1", Routes(this.router));
    this.app.use(morgan("dev"));
  }
}

export default new App().app;
