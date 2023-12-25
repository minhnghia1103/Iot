import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Switch,
} from "@mui/material";
import { red } from "@mui/material/colors";
import React from "react";

function Control() {
  return (
    <div className="flex flex-row space-x-4 flex-wrap justify-around mb-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <ControlCard />
      ))}
    </div>
  );
}

export const ControlCard = () => (
  <Card sx={{ minWidth: 275 }} className="relative">
    <CardContent
      sx={{
        backgroundColor: red[400],
      }}
    >
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        Temperature
      </Typography>
      <Typography variant="body2">
        <span className="text-4xl">30</span>
        <span className="text-xl">°C</span>
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
