import {
  TextField,
  Button,
  Box,
  MenuItem,
  Container,
  Card,
  CardContent,
  Typography,
  Grid,
  Stack,
} from "@mui/material";

import { Save, Clear } from "@mui/icons-material";

import { useState } from "react";

export default function Atendimento() {
  const situacoes = [
    { id: "acamado", nome: "Acamado" },
    { id: "sentado", nome: "Sentado" },
    { id: "cadeirante", nome: "Cadeirante" },
  ];

  const [form, setForm] = useState({
    nome: "",
    telefone: "",
    cep: "",
    endereco: "",
    numero: "",
    bairro: "",
    cidade: "",
    estado: "",
    situacao: "",
    observacao: "",
  });

  function alterarCampo(campo: string, valor: string) {
    setForm({
      ...form,
      [campo]: valor,
    });
  }

  async function buscarCep(cep: string) {
    const somenteNumeros = cep.replace(/\D/g, "");

    if (somenteNumeros.length !== 8) return;

    const resposta = await fetch(
      `https://viacep.com.br/ws/${somenteNumeros}/json/`,
    );

    const dados = await resposta.json();

    if (!dados.erro) {
      setForm({
        ...form,

        cep: somenteNumeros,

        endereco: dados.logradouro,

        bairro: dados.bairro,

        cidade: dados.localidade,

        estado: dados.uf,
      });
    }
  }

  function limpar() {
    setForm({
      nome: "",
      telefone: "",
      cep: "",
      endereco: "",
      numero: "",
      bairro: "",
      cidade: "",
      estado: "",
      situacao: "",
      observacao: "",
    });
  }

  function salvar() {
    console.log(form);

    alert("Atendimento registrado!");
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Card
          elevation={5}
          sx={{
            borderRadius: 3,
          }}
        >
          <CardContent>
            <Typography variant="h5" fontWeight="bold" mb={3}>
              Novo Atendimento
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={7}>
                <TextField
                  fullWidth
                  label="Nome"
                  value={form.nome}
                  onChange={(e) => alterarCampo("nome", e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={5}>
                <TextField
                  fullWidth
                  label="Telefone"
                  value={form.telefone}
                  onChange={(e) => {
                    const valor = e.target.value.replace(/\D/g, "");

                    alterarCampo("telefone", valor);
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="CEP"
                  value={form.cep}
                  inputProps={{
                    maxLength: 8,
                  }}
                  onChange={(e) => {
                    const valor = e.target.value.replace(/\D/g, "");

                    alterarCampo("cep", valor);

                    if (valor.length === 8) {
                      buscarCep(valor);
                    }
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={8}>
                <TextField
                  fullWidth
                  label="Endereço"
                  value={form.endereco}
                  onChange={(e) => alterarCampo("endereco", e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={2}>
                <TextField
                  fullWidth
                  label="Número"
                  value={form.numero}
                  onChange={(e) => alterarCampo("numero", e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={5}>
                <TextField
                  fullWidth
                  label="Bairro"
                  value={form.bairro}
                  onChange={(e) => alterarCampo("bairro", e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={5}>
                <TextField
                  fullWidth
                  label="Cidade"
                  value={form.cidade}
                  onChange={(e) => alterarCampo("cidade", e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={3}>
                <TextField
                  fullWidth
                  label="Estado"
                  value={form.estado}
                  onChange={(e) => alterarCampo("estado", e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={5}>
                <TextField
                  select
                  fullWidth
                  label="Situação"
                  value={form.situacao}
                  onChange={(e) => alterarCampo("situacao", e.target.value)}
                >
                  {situacoes.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.nome}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Observação"
                  value={form.observacao}
                  onChange={(e) => alterarCampo("observacao", e.target.value)}
                />
              </Grid>
            </Grid>

            <Stack
              direction={{
                xs: "column",
                sm: "row",
              }}
              spacing={2}
              mt={4}
            >
              <Button variant="contained" startIcon={<Save />} onClick={salvar}>
                Gerar Atendimento
              </Button>

              <Button
                variant="outlined"
                color="error"
                startIcon={<Clear />}
                onClick={limpar}
              >
                Limpar
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}
