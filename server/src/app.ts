import express from "express";
import makeDb from "./databases";
import { UserDb } from "./data-access";
import cors from "cors";
import bodyParser from "body-parser";
import appRouter from "./routes";
import passport from "./passport";
import { upload } from "./middlewares/file-upload-middleware";

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(appRouter);
app.use(upload.single("file"));

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
