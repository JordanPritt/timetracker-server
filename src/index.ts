import dotenv from "dotenv";
dotenv.config();
import logger from "morgan";
import stage from "./config.json";
import App from "./app";

let message = { "message": "Hello World" };

App.get("/", (req, res) => {
  res.send(message);
});

App.listen(`${stage.port}`, () => {
  logger(process.env.NODE_ENV);
  logger(`Server now listening at localhost:${stage.port}`);
});

export default App;
