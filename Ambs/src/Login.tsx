import { useState } from "react";

import { Box, Button, TextField, Paper, Link, Avatar } from "@mui/material";

import logo from "./images/PCAmb.png";

export default function Login() {
  const [showPassword] = useState(false);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#1b80af",
      }}
    >
      <Paper
        sx={{
          padding: 4,
          width: 350,
          borderRadius: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar
          src={logo}
          alt="PCAmb"
          sx={{
            width: 100,
            height: 100,
            mb: 2,
          }}
        />
        <TextField fullWidth label="Usuário" margin="normal" />
        <TextField
          fullWidth
          label="Senha"
          type={showPassword ? "text" : "password"}
          margin="normal"
        />

        <Button fullWidth variant="contained" sx={{ mt: 3 }}>
          Entrar
        </Button>

        <Link
          href="#"
          variant="body2"
          sx={{
            display: "block",
            mt: 2,
            textAlign: "center",
          }}
        >
          Esqueceu a senha?
        </Link>
      </Paper>
    </Box>
  );
}
