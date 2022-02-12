import express from "express";
import makeDb from "./database";
import { UserDb } from "./data-access";

const app = express();

app.get("/api/", (req, res) =>
  res.json({
    message: "Hello",
  })
);

app.listen(3000, () => console.log("Server is listening on port 3000"));

makeDb().then(async () => {
  const user = await UserDb.findOne();
  if (!user) {
    await UserDb.insert({
      first_name: "joshua",
      last_name: "phua",
      email: "a@gmail.com",
      password: "dadssd",
    });
  }
});
