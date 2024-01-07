import mqtt from "mqtt";
import { getIPAddress } from "./func";

const brokerUrl = `mqtt://${getIPAddress()}`;
const topicfromEsp32 = "esp32/data";

console.log(brokerUrl);

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const clientDataEsp32 = mqtt.connect(brokerUrl);
setInterval(() => {
  clientDataEsp32.publish(
    topicfromEsp32,
    JSON.stringify({
      from: "esp32",
      temperature: getRandomInt(20, 30),
      humidity: getRandomInt(50, 100),
      lightValue: getRandomInt(0, 100),
      earthMoisture: getRandomInt(0, 100),
      createdAt: new Date().getTime(),
    })
  );
}, 2000);
