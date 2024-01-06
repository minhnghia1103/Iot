const mqtt = require("mqtt");
import { getIPAddress } from "./func";
const brokerUrl = `mqtt://${getIPAddress()}`;
const topic = "esp32/data";
const client = mqtt.connect(brokerUrl);

client.on("connect", () => {
  console.log("Connected to MQTT broker");

  // Gửi tin nhắn JSON đến chủ đề đã chọn
  setInterval(() => {
    const data = {
      from: "esp32",
      temperature: 24.20000076,
      humidity: 81,
      lightValue: 11.66666603,
      earthMoisture: 0,
    };

    const message = JSON.stringify(data);

    client.publish(topic, message);
    console.log(`Published to ${topic}: ${message}`);
  }, 20000);
});
