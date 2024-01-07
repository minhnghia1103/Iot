import express from "express";
import "./broker/mqtt";
import { clineData, fromControlEsp32 } from "./broker/subscribe";
import { updateControl } from "./controller/controllerDump";
import { createUser, login } from "./controller/login";
import "./cron";

const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: true }));
app.use(cookieParser());

// clineData();
fromControlEsp32();
// app.put("/updateControl", updateControl);
app.post("/register", createUser);
app.post("/login", login);
app.listen(8080);
