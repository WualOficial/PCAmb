import { Button, TextField, Box, Card, Container } from "@mui/material";

export default function CadastroFuncional() {
  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Card>
          <TextField label="Nome" variant="outlined" />
          <TextField label="Email" variant="outlined" />
          <TextField label="Cpf" variant="outlined" />
          <TextField label="Senha" variant="outlined" type="password" />
          <TextField label="Acesso" variant="outlined" />
          <Button variant="contained">Cadastrar</Button>
        </Card>
      </Box>
    </Container>
  );
}
