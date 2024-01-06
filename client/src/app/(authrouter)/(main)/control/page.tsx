import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Switch,
} from "@mui/material";
import { yellow, blue, grey, brown } from "@mui/material/colors";
import React from "react";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import CloudIcon from "@mui/icons-material/Cloud";
import LightModeIcon from "@mui/icons-material/LightMode";
import WaterDropIcon from "@mui/icons-material/WaterDrop";

function Control() {
  const controlData = [
    { title: "Temperature", unit: "°C", color: yellow[400], icon: <WbSunnyIcon /> },
    { title: "Air Humidity", unit: "%", color: blue[400], icon: <CloudIcon /> },
    { title: "Light", unit: "lx", color: grey[400], icon: <LightModeIcon /> },
    { title: "Soil Moisture", unit: "%", color: brown[400], icon: <WaterDropIcon /> },
  ];

  return (
    <div className="flex flex-row space-x-4 flex-wrap justify-around mb-4">
      {controlData.map((control, index) => (
        <ControlCard
          key={index}
          title={control.title}
          unit={control.unit}
          color={control.color}
          icon={control.icon}
        />
      ))}
    </div>
  );
}

export const ControlCard = ({ title, unit, color, icon }) => (
  <Card sx={{ minWidth: 275 }} className="relative">
    <CardContent
      sx={{
        backgroundColor: color,
      }}
    >
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        {icon} {title}
      </Typography>
      <Typography variant="body2">
        <span className="text-4xl">30</span>
        <span className="text-xl">{unit}</span>
      </Typography>
    </CardContent>
    <CardActions>
      <Switch
        sx={{
          "& .MuiSwitch-switchBase.Mui-checked": {
            color: "#fff",
            "& + .MuiSwitch-track": {
              backgroundColor: "#4dd0e1",
              opacity: 1,
            },
          },
          "& .MuiSwitch-thumb": {
            width: 24,
            height: 24,
          },
          "& .MuiSwitch-track": {
            borderRadius: 26 / 2,
            backgroundColor: "#bdbdbd",
            opacity: 1,
          },
        }}
      />
    </CardActions>
  </Card>
);

export default Control;

