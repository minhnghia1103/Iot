"use client";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";
import CustonButton from "../../../components/button/button";
function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <div className="p-12 bg-white rounded shadow-xl w-1/3 bg-opacity-85">
      <h1 className="text-3xl font-bold mb-4">Login</h1>
      <TextField className="w-full mb-5" label="Email" variant="outlined" />
      <TextField
        className="w-full mb-5"
        label="Password"
        variant="outlined"
        type={showPassword ? "text" : "password"}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton edge="end" onClick={handleClickShowPassword}>
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <CustonButton>
        <Button
          className="w-full p-2 text-black  bg-white hover:text-white hover:bg-green-500"
          variant="contained"
          color="primary"
        >
          Login
        </Button>
      </CustonButton>
      <Link
        href="register"
        className="mt-4 inline-block text-base text-black align-baseline hover:text-green-800 w-full text-center"
      >
        Don't have an account?
      </Link>
    </div>
  );
}

export default Login;
