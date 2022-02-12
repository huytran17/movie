import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function makeDb() {
  const DATABASE_URL = process.env.DATABASE_URI || "";
  const DATABASE_OPTIONS = {
    useNewUrlParser: true,
    connectTimeoutMS: 10000,
    useUnifiedTopology: true, //if set to true, create error: "MongooseServerSelectionError: getaddrinfo ENOTFOUND mongo mongo:27017"
  };

  const is_not_connected = mongoose.connection.readyState == 0;
  if (is_not_connected) {
    console.log("Setting up database...");
    await mongoose.connect(DATABASE_URL, DATABASE_OPTIONS);
    console.log("Successfully connected to DB");
  }

  return mongoose;
}

export default makeDb;
