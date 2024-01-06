"use client";
import LineChart from "@/components/charts/LineChart";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import { red } from "@mui/material/colors";
import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { firestore } from "../testFireBase/page";
import { MqttContext } from "@/contexts/MqttContext";

const datasetOptions = {
  label: "Dataset 1",
  borderColor: "rgb(255, 99, 132)",
  backgroundColor: "rgba(255, 99, 132, 0.5)",
  tension: 0.3,
};

function Dashboard() {
  const { mqttClient } = useContext(MqttContext);
  const xLabelNumber = 10;

  const xTempDataRef = useRef<string[]>(
    Array.from({ length: xLabelNumber }, (_, index) => {
      return "";
    })
  );
  const yTempDataRef = useRef<number[]>(
    Array.from({ length: xLabelNumber }, () => 0)
  );

  const [tempLineData, setTempLineData] = useState({
    labels: xTempDataRef.current,
    datasets: [
      {
        data: yTempDataRef.current,
        ...datasetOptions,
      },
    ],
  });

  const xHumidDataRef = useRef<string[]>(
    Array.from({ length: xLabelNumber }, (_, index) => {
      return "";
    })
  );
  const yHumidDataRef = useRef<number[]>(
    Array.from({ length: xLabelNumber }, () => 0)
  );

  const [humidLineData, setHumidLineData] = useState({
    labels: xHumidDataRef.current,
    datasets: [
      {
        data: yHumidDataRef.current,
        ...datasetOptions,
      },
    ],
  });

  const xLightDataRef = useRef<string[]>(
    Array.from({ length: xLabelNumber }, (_, index) => {
      return "";
    })
  );
  const yLightDataRef = useRef<number[]>(
    Array.from({ length: xLabelNumber }, () => 0)
  );

  const [lightLineData, setLightLineData] = useState({
    labels: xLightDataRef.current,
    datasets: [
      {
        data: yLightDataRef.current,
        ...datasetOptions,
      },
    ],
  });

  const xMoiDataRef = useRef<string[]>(
    Array.from({ length: xLabelNumber }, (_, index) => {
      return "";
    })
  );
  const yMoiDataRef = useRef<number[]>(
    Array.from({ length: xLabelNumber }, () => 0)
  );

  const [moiLineData, setMoiLineData] = useState({
    labels: xMoiDataRef.current,
    datasets: [
      {
        data: yMoiDataRef.current,
        ...datasetOptions,
      },
    ],
  });

  const pushData = (newData: number, prevArray: MutableRefObject<number[]>) => {
    if (prevArray.current.length >= xLabelNumber) {
      prevArray.current.shift();
    }
    prevArray.current.push(newData);
  };

  const generateTimeLabels = (
    createdAt: number,
    prevArray: MutableRefObject<string[]>
  ) => {
    if (prevArray.current.length == xLabelNumber) {
      prevArray.current.shift();
    }
    prevArray.current.push(
      new Date(createdAt).toLocaleTimeString("en-US", {
        hour12: false,
        timeZone: "Asia/Ho_Chi_Minh",
      })
    );
  };
  const setData = (
    subFirestoreData: {
      createdAt: number;
      data: number;
    },
    ref1: MutableRefObject<number[]>,
    ref2: MutableRefObject<string[]>,
    setState: Dispatch<SetStateAction<any>>
  ) => {
    generateTimeLabels(subFirestoreData.createdAt, ref2);
    pushData(subFirestoreData.data, ref1);
    setState({
      labels: ref2.current,
      datasets: [
        {
          data: ref1.current,
          ...datasetOptions,
        },
      ],
    });
  };
  useEffect(() => {
    mqttClient?.subscribe("from-esp32");
    mqttClient?.on("message", (topic, payload) => {
      console.log("topic: ", topic, "payload: ", payload.toString());
    });
    const unsubscribe = firestore
      .collection("DataEsp32")
      .orderBy("createdAt", "desc")
      .limit(1)
      .onSnapshot(async (snapshot) => {
        const newData = snapshot.docs.map((doc) => doc.data())[0];
        console.log(newData.createdAt);
        if (newData) {
          setData(
            { createdAt: newData.createdAt, data: newData.temperature },
            yTempDataRef,
            xTempDataRef,
            setTempLineData
          );
          setData(
            { createdAt: newData.createdAt, data: newData.humidity },
            yHumidDataRef,
            xHumidDataRef,
            setHumidLineData
          );
          setData(
            { createdAt: newData.createdAt, data: newData.lightValue },
            yLightDataRef,
            xLightDataRef,
            setLightLineData
          );
          setData(
            {
              createdAt: newData.createdAt,
              data: newData.earthMoisture,
            },
            yMoiDataRef,
            xMoiDataRef,
            setMoiLineData
          );
        }
      });
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <div className="flex flex-row space-x-4 flex-wrap justify-around mb-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <BasicCard />
        ))}
      </div>
      <div className="flex flex-row space-x-4 flex-wrap justify-around">
        <LineChart
          key={crypto.randomUUID()}
          width="800px"
          height="400px"
          lineData={tempLineData}
          customOptions={{
            plugins: {
              title: {
                display: true,
                text: "Temperature",
              },
            },
            scales: {
              y: {
                title: {
                  display: true,
                  text: "Temperature (°C)",
                  color: "green",
                  font: {
                    size: 16,
                    weight: "bold",
                  },
                },
                min: 0,
                max: 200,
              },
              x: {
                title: {
                  display: true,
                  text: "Time(HH:MM:SS)",
                  color: "green",
                  font: {
                    size: 16,
                    weight: "bold",
                  },
                },
              },
            },
          }}
        />
        <LineChart
          key={crypto.randomUUID()}
          width="800px"
          height="400px"
          lineData={humidLineData}
          customOptions={{
            plugins: {
              title: {
                display: true,
                text: "Humidity",
              },
            },
            scales: {
              y: {
                title: {
                  display: true,
                  text: "Humidity (%)",
                  color: "green",
                  font: {
                    size: 16,
                    weight: "bold",
                  },
                },
                min: 0,
                max: 200,
              },
              x: {
                title: {
                  display: true,
                  text: "Time(HH:MM:SS)",
                  color: "green",
                  font: {
                    size: 16,
                    weight: "bold",
                  },
                },
              },
            },
          }}
        />
        <LineChart
          key={crypto.randomUUID()}
          width="800px"
          height="400px"
          lineData={lightLineData}
          customOptions={{
            plugins: {
              title: {
                display: true,
                text: "Light",
              },
            },
            scales: {
              y: {
                title: {
                  display: true,
                  text: "Light (%)",
                  color: "green",
                  font: {
                    size: 16,
                    weight: "bold",
                  },
                },
                min: 0,
                max: 200,
              },
              x: {
                title: {
                  display: true,
                  text: "Time(HH:MM:SS)",
                  color: "green",
                  font: {
                    size: 16,
                    weight: "bold",
                  },
                },
              },
            },
          }}
        />
        <LineChart
          key={crypto.randomUUID()}
          width="800px"
          height="400px"
          lineData={moiLineData}
          customOptions={{
            plugins: {
              title: {
                display: true,
                text: "Soil Moisture",
              },
            },
            scales: {
              y: {
                title: {
                  display: true,
                  text: "Soil Moisture (%)",
                  color: "green",
                  font: {
                    size: 16,
                    weight: "bold",
                  },
                },
                min: 0,
                max: 200,
              },
              x: {
                title: {
                  display: true,
                  text: "Time(HH:MM:SS)",
                  color: "green",
                  font: {
                    size: 16,
                    weight: "bold",
                  },
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
}

const BasicCard = () => {
  return (
    <Card sx={{ minWidth: 275 }} className="relative">
      <CardContent
        sx={{
          backgroundColor: red[400],
        }}
      >
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Temperature
        </Typography>
        <DeviceThermostatIcon
          sx={{
            fontSize: "4rem",
            position: "absolute",
            right: "0",
            top: "1rem",
            color: "white",
          }}
        />
        <Typography variant="body2">
          <span className="text-4xl">30</span>
          <span className="text-xl">°C</span>
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">View History</Button>
      </CardActions>
    </Card>
  );
};
export default Dashboard;
