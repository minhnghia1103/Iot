const mqtt = require("mqtt");

// Thông tin kết nối đến MQTT broker
const brokerUrl = "mqtt://192.168.1.3"; // Địa chỉ IP của máy chủ MQTT
const topic = "pump/control";

// Kết nối đến broker
const client = mqtt.connect(brokerUrl);

// Khi kết nối thành công
client.on("connect", () => {
  console.log("Connected to MQTT broker");

  // Gửi tin nhắn đến chủ đề đã chọn
  setInterval(() => {
    const message = `Hello from publisher at ${new Date().toLocaleTimeString()}`;
    client.publish(topic, message);
    console.log(`Published to ${topic}: ${message}`);
  }, 2000);
});

// Xử lý lỗi nếu có
client.on("error", (err) => {
  console.error(`Error: ${err}`);
});
