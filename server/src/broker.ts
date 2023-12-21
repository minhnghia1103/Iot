import { getIPAddress } from "./func";

import aedes from "aedes";
import net from "net";

const server = net.createServer(new aedes().handle);

const serverOptions = {
  host: getIPAddress(), // Get IP address
  port: 1883, // Cổng MQTT
};

server.listen(serverOptions, function () {
  console.log(`Server is  on ${serverOptions.host}:${serverOptions.port}`);
});
