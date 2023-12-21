import mqtt from "mqtt";
import { getIPAddress } from "./func";
// Thông tin kết nối đến MQTT broker
const brokerUrl = `mqtt://${getIPAddress()}`; // Địa chỉ IP của máy chủ MQTT
const topic = "esp32/data";

// Kết nối đến broker
const client = mqtt.connect(brokerUrl);

// Khi kết nối thànxh công
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
client.on("error", (err: any) => {
  console.error(`Error: ${err}`);
});
