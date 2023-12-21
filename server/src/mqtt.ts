import mqtt from "mqtt";
import { getIPAddress } from "./func";

const brokerUrl = `mqtt://${getIPAddress()}`; // Địa chỉ IP của máy chủ MQTT
const topic = "esp32/data";

// Kết nối đến broker
export const client = mqtt.connect(brokerUrl);

// Khi kết nối thành công
client.on("connect", () => {
  console.log("Connected to MQTT broker at " + brokerUrl);
  // Đăng ký để nhận tin nhắn từ chủ đề đã chọn
  client.subscribe(topic);
});

// Xử lý lỗi nếu có
client.on("error", (err) => {
  console.error(`Error: ${err}`);
});
