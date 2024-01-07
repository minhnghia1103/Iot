import express from "express";
import "./broker/mqtt";
import { createUser, login } from "./controller/login";
import "./cron";

const app = express();
import cors from "cors";
import bodyParser from "body-parser";
const cookieParser = require("cookie-parser");

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: true }));
app.use(cookieParser());

app.post("/login", login);
app.post("/register", createUser);

app.listen(8080);
