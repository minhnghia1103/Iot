const mqtt = require("mqtt");

// Thông tin kết nối đến MQTT broker
const brokerUrl = "mqtt://192.168.1.3"; // Địa chỉ IP của máy chủ MQTT
const topic = "esp32/data";

// Kết nối đến broker
const client = mqtt.connect(brokerUrl, { protocol: "mqtt" }); // Chú ý: Thêm protocol vào đây

// Khi kết nối thành công
client.on("connect", () => {
  console.log("Connected to MQTT broker");

  // Đăng ký để nhận tin nhắn từ chủ đề đã chọn
  client.subscribe(topic);
});

// Khi nhận được một tin nhắn từ chủ đề đã đăng ký
client.on("message", (topic, message) => {
  console.log(`Received message from ${topic}: ${message.toString()}`);
  // Xử lý tin nhắn ở đây
});

// Xử lý lỗi nếu có
client.on("error", (err) => {
  console.error(`Error: ${err}`);
});
