import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const database_uri = process.env.DATABASE_URI || "";

const connect_options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

export default function database_connect() {
  mongoose.connect(database_uri);

  const db = mongoose.connection;
  db.on("error", function (err) {
    if (err) console.log(err);
  });
  db.once("open", function () {
    console.log("Connect to database successfully!");
  });
}
