import express from "express";

const app = express();

app.get("/", () => console.log("Hello"));

app.listen(3000, () => console.log("Server is listening on port 3000"));
