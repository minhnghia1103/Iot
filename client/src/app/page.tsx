"use client";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

export default function Home() {
  const [data, setData] = useState<string>("");
  useEffect(() => {
    const socket: Socket = io("http://localhost:3000");
    socket.on("connect", () => {
      console.log("connected");
    });
    socket.on("mqtt-message", (data) => {
      setData(data.topic + ": " + data.message);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return <div className="text-center text-blue-500">{data}</div>;
}
