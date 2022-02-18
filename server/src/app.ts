import express from "express";
import makeDb from "./databases";
import { UserDb } from "./data-access";
import cors from "cors";
import bodyParser from "body-parser";
import appRouter from "./routes";

const app = express();

app.use(appRouter);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(3000, () => console.log("Server is listening on port 3000"));

makeDb().then(async () => {
  const user = await UserDb.findOne();
  if (!user) {
    await UserDb.insert({
      first_name: "Huy",
      last_name: "Tran",
      username: "huytran",
      email: "a@gmail.com",
      password: "dadssd",
    });
  }
});
