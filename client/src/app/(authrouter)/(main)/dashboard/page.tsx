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

function Dashboard() {
  return (
    <div>
      <div className="flex flex-row space-x-4 flex-wrap justify-around mb-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <BasicCard />
        ))}
      </div>
      <div className="flex flex-row space-x-4 flex-wrap justify-around">
        <LineChartComponent />
        <LineChartComponent />
        <LineChartComponent />
        <LineChartComponent />
      </div>
    </div>
  );
}

const LineChartComponent = () => (
  <LineChart
    width="800px"
    height="400px"
    interval={1}
    xLabelNumber={10}
    customOptions={{
      plugins: {
        title: {
          display: true,
          text: "Nghia dog",
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
);

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
