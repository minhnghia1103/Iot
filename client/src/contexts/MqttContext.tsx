import React, { createContext, useEffect, useState } from "react";
import mqtt, { MqttClient } from "mqtt";

export const MqttContext = createContext<{
  mqttClient: MqttClient | null;
  mqttPublish: (context: any) => void;
  mqttSub: (subscription: any) => void;
  mqttUnSub: (subscription: any) => void;
  mqttDisconnect: () => void;
}>({
  mqttClient: null,
  mqttPublish: () => {},
  mqttSub: () => {},
  mqttUnSub: () => {},
  mqttDisconnect: () => {},
});
const ipAddr = "192.168.1.7";
const brokerUrl = `ws://${ipAddr}:8883`;

export const dataTopic = "esp32/data";
export const controlTopic = "control";
export const MqttContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [mqttClient, setMqttClient] = useState<MqttClient | null>(
    mqtt.connect(brokerUrl)
  );
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (mqttClient) {
      mqttClient.on("connect", () => {
        console.log("Connected to MQTT broker at " + brokerUrl);
        setLoading(false);
        mqttSub({ topic: dataTopic, qos: 0 });
        mqttSub({ topic: controlTopic, qos: 0 });
      });
      mqttClient.on("error", (err) => {
        console.error(`Error: ${err}`);
        mqttClient.end();
      });
    }
  }, [mqttClient]);

  const mqttPublish = (context: any) => {
    if (mqttClient && mqttClient.connected) {
      // topic, QoS & payload for publishing message
      const { topic, qos, payload } = context;
      mqttClient.publish(topic, payload, { qos }, (error) => {
        if (error) {
          console.log("Publish error: ", error);
        }
      });
    }
  };

  const mqttSub = (subscription: any) => {
    if (mqttClient && mqttClient.connected) {
      // topic & QoS for MQTT subscribing
      const { topic, qos } = subscription;
      // subscribe topic
      mqttClient.subscribe(topic, { qos }, (error) => {
        if (error) {
          console.log("Subscribe to topics error", error);
          return;
        }
        console.log(`Subscribe to topics: ${topic}`);
      });
    }
  };

  const mqttUnSub = (subscription: any) => {
    if (mqttClient && mqttClient.connected) {
      const { topic, qos } = subscription;
      mqttClient.unsubscribe(topic, { qos }, (error) => {
        if (error) {
          console.log("Unsubscribe error", error);
          return;
        }
        console.log(`unsubscribed topic: ${topic}`);
      });
    }
  };

  const mqttDisconnect = () => {
    if (mqttClient && mqttClient.connected) {
      try {
        mqttClient.end(false, () => {
          console.log("disconnected successfully");
        });
      } catch (error) {
        console.log("disconnect error:", error);
      }
    }
  };
  return !loading ? (
    <MqttContext.Provider
      value={{
        mqttClient,
        mqttPublish,
        mqttSub,
        mqttUnSub,
        mqttDisconnect,
      }}
    >
      {children}
    </MqttContext.Provider>
  ) : (
    "Loading..."
  );
};
