// connectDB.ts
import mqtt from "mqtt";
import { getIPAddress } from "./func";
import aedes from "aedes";
import net from "net";
import { eventEmitter, getController } from "../controller/controllerDump";

const brokerUrl = `mqtt://${getIPAddress()}`;
const topicControlDump = "control";

// Tạo server mqtt
export const server = net.createServer(new aedes().handle);

const serverOptions = {
  host: getIPAddress(), // Get IP address
  port: 1883, // Cổng MQTT
};

server.listen(serverOptions, function () {
  console.log(`Server is on ${serverOptions.host}:${serverOptions.port}`);
});

const clientControl = mqtt.connect(brokerUrl);

export const control = () => {
  clientControl.on("connect", () => {
    console.log("Connected to MQTT broker for dump control");

    // Lắng nghe sự kiện từ updateControl
    eventEmitter.on("updateSuccess", async () => {
      try {
        const data = await getController();
        console.log("line 27", data);
        clientControl.publish(topicControlDump, JSON.stringify(data));
      } catch (error: any) {
        console.error(`Error: ${error}`);
      }
    });
  });

  clientControl.on("error", (err: any) => {
    console.error(`Error: ${err}`);
  });
};
control();
