const mqtt = require("mqtt");
const socketIO = require("socket.io");
const http = require("http");

// Thông tin kết nối đến MQTT broker
const brokerUrl = "mqtt://192.168.1.3"; // Địa chỉ IP của máy chủ MQTT
const topic = "esp32/data";

// Kết nối đến broker
const client = mqtt.connect(brokerUrl, { protocol: "mqtt" }); // Chú ý: Thêm protocol vào đây

// Tạo máy chủ HTTP và kết nối socket.io
const server = http.createServer();
const io = socketIO(server);

// Khi có kết nối từ client
io.on("connection", (socket) => {
  console.log("A user connected");

  // Khi nhận được tin nhắn từ MQTT
  client.on("message", (mqttTopic, message) => {
    if (mqttTopic === topic) {
      const payload = message.toString();
      console.log(`Received message from ${mqttTopic}: ${payload}`);

      // Gửi tin nhắn đến client thông qua socket.io
      socket.emit("mqtt_message", payload);
    }
  });

  // Khi ngắt kết nối từ client
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// Khi kết nối thành công
client.on("connect", () => {
  console.log("Connected to MQTT broker");

  // Đăng ký để nhận tin nhắn từ chủ đề đã chọn
  client.subscribe(topic);
});

// Xử lý lỗi nếu có
client.on("error", (err) => {
  console.error(`Error: ${err}`);
});

// Lắng nghe trên cổng 3000 (hoặc cổng khác nếu bạn muốn)
const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
