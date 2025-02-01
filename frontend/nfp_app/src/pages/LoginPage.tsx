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

export default function LoginPage({
  handleSession,
}: {
  handleSession: (session: string) => void;
}) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(0);
  const handleLogin = () => {
    axios
      .post(BASE_URL + "login/", {
        email: email,
      })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("expiry", res.data.expiry);
        localStorage.setItem("token", res.data.token);
        handleSession(res.data.token);
        setError(0);
      })
      .catch((e) => {
        console.log(e.message);
        setError(e.status);
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
          Please sign-in by using an email connected in your Outlook application
        </Typography>
        {error !== 0 && (
          <Alert severity="error">
            This email address has not been found in your Outlook application
          </Alert>
        )}
        <TextField
          placeholder="Email"
          value={email}
          fullWidth
          onChange={(event) => setEmail(event.target.value)}
        />
        <Button variant="contained" size="large" onClick={handleLogin}>
          Sign-In
        </Button>
      </Stack>
    </Container>
  );
}
