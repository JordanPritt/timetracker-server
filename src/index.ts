import dotenv from "dotenv";
dotenv.config();
// require("dotenv").config();
import stage from "./config.json";
import App from "./app";

let message = { message: "Hello World" };

App.get("/", (req, res) => {
  res.send(message);
});

App.listen(`${stage.port}`, () => {
  console.log(process.env.NODE_ENV);
  console.log(`Server now listening at localhost:${stage.port}`);
});

export default App;
