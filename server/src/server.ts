import express from "express";
import { Server } from "socket.io";
import { createServer } from "node:http";
// import mqtt from "mqtt";
import mqtt from "mqtt";
import { getIPAddress } from "./func";
import { protocol } from "engine.io-parser";
import { client as mqttClient } from "./mqtt";
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins
  },
});

// Thông tin kết nối đến MQTT broker

io.on("connection", (socket) => {
  console.log("A user connected");
  mqttClient.on("message", (topic, message) => {
    console.log(`Received from ${topic}: ${message}`);
    socket.emit("mqtt-message", { topic, message: message.toString() });
  });
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

app.get("/", (req, res) => {
  res.send("Hello World");
});
server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
