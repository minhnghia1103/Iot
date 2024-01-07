"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Switch,
  Button,
} from "@mui/material";
import { yellow, blue, grey, brown } from "@mui/material/colors";
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

  const [allSwitchesState, setAllSwitchesState] = useState(
    controlData.reduce((acc, curr, index) => ({ ...acc, [index]: false }), {})
  );

  const handleSwitchChange = (index) => {
    setAllSwitchesState((prevState) => ({ ...prevState, [index]: !prevState[index] }));
  };

  const handleTurnAllOn = () => {
    setAllSwitchesState((prevState) => Object.fromEntries(Object.keys(prevState).map((key) => [key, true])));
  };

  const handleTurnAllOff = () => {
    setAllSwitchesState((prevState) => Object.fromEntries(Object.keys(prevState).map((key) => [key, false])));
  };

  const isAllOn = Object.values(allSwitchesState).every((value) => value);
  const isAllOff = Object.values(allSwitchesState).every((value) => !value);

  return (
    <div className="flex flex-col items-center" style={{ marginTop: "50px" }}>
      <div className="flex flex-row space-x-4 flex-wrap justify-around mb-4">
        {controlData.map((control, index) => (
          <ControlCard
            key={index}
            title={control.title}
            unit={control.unit}
            color={control.color}
            icon={control.icon}
            switchState={allSwitchesState[index]}
            onSwitchChange={() => handleSwitchChange(index)}
          />
        ))}
      </div>

      <div className="flex space-x-4">
        <Button variant="contained" style={{ backgroundColor: isAllOn ? blue[500] : "inherit", color: isAllOn ? "#fff" : "inherit" }} onClick={handleTurnAllOn}>
          Bật hết
        </Button>
        <Button variant="contained" style={{ backgroundColor: isAllOff ? "red" : "inherit", color: isAllOff ? "#fff" : "inherit" }} onClick={handleTurnAllOff}>
          Tắt hết
        </Button>
      </div>
    </div>
  );
}

export const ControlCard = ({ title, unit, color, icon, switchState, onSwitchChange }) => (
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
        checked={switchState}
        onChange={onSwitchChange}
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
      <Typography variant="body2" sx={{ ml: 1, color: switchState ? "#4dd0e1" : "#bdbdbd" }}>
        {switchState ? "Bật" : "Tắt"}
      </Typography>
    </CardActions>
  </Card>
);

export default Control;






