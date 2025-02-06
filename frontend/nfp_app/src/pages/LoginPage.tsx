import {
  Alert,
  Avatar,
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../constants";
import { Error } from "@mui/icons-material";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";

export default function LoginPage() {
  const { instance } = useMsal();
  const handleLogin = () => {
    instance
      .loginPopup(loginRequest)
      .then((res) => {
        instance.setActiveAccount(res.account);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Container component="main" maxWidth="lg">
      <Stack alignItems={"center"} spacing={5} padding={20}>
        <Stack alignItems={"center"}>
          <Avatar style={{ backgroundColor: "blue" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h4">Sign-In</Typography>
        </Stack>

        <Typography textAlign={"center"}>
          Please sign-in with your Microsoft Account
        </Typography>
        <Button variant="contained" size="large" onClick={handleLogin}>
          Sign-In
        </Button>
      </Stack>
    </Container>
  );
}
