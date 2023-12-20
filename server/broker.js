const aedes = require("aedes")();
const net = require("net");
const server = net.createServer(aedes.handle);
const mqtt = require("mqtt");

const serverOptions = {
  host: "192.168.1.3", // Địa chỉ IP của máy bạn
  port: 1883, // Cổng MQTT
};

server.listen(serverOptions, function () {
  console.log(`Server is running on ${serverOptions.host}:${serverOptions.port}`);
});

// const broker = aedes;

// broker.on("client", function (client) {
//   console.log("Client connected:", client.id);
// });

// broker.on("clientDisconnect", function (client) {
//   console.log("Client disconnected:", client.id);
// });

// broker.on("publish", function (packet, client) {
//   if (client) {
//     console.log("Received message from client:", client.id);
//     console.log("Topic:", packet.topic);
//     console.log("Data:", packet.payload.toString());
//     // Thực hiện xử lý dữ liệu ở đây
//   }
// });
