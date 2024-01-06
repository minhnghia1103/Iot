import mqtt from "mqtt";
import { getIPAddress } from "./func";

const brokerUrl = `mqtt://${getIPAddress()}`;
const topicfromEsp32 = "from-esp32";

console.log(brokerUrl);

export const clientDataEsp32 = mqtt.connect(brokerUrl);
setInterval(() => {
  clientDataEsp32.publish(topicfromEsp32, "Hello from server");
}, 1000);
