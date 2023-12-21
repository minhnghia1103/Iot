const mqtt = require("mqtt");
const { User, DataEsp32 } = require("./config");
const fs = require("fs");

// Thông tin kết nối đến MQTT broker
const brokerUrl = "mqtt://192.168.1.4"; // Địa chỉ IP của máy chủ MQTT
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
client.on("message", async (topic, message) => {
  console.log(`Received message from ${topic}: ${message.toString()}`);

  try {
    const data = JSON.parse(message.toString());

    // Thêm các trường riêng lẻ vào Firestore
    await DataEsp32.add({
      from: data.from,
      temperature: data.temperature,
      humidity: data.humidity,
      lightValue: data.lightValue,
      earthMoisture: data.earthMoisture,
    });

    console.log("Data added to Firestore successfully!");
  } catch (error) {
    console.error("Error processing message:", error);
  }
});

// Xử lý lỗi nếu có
client.on("error", (err) => {
  console.error(`Error: ${err}`);
});
