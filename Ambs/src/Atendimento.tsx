import {
  TextField,
  Button,
  MenuItem,
  Container,
  Card,
  CardContent,
  Box,
  Typography,
  Stack,
  Grid,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from "@mui/material";

import { Save, Clear } from "@mui/icons-material";

import { useState } from "react";

export default function Atendimento() {
  const [checkedAcompanhante, setCheckedAcompanhante] = useState(false);
  const situacoes = [
    {
      id: "acamado",
      nome: "Acamado",
    },
    {
      id: "sentado",
      nome: "Sentado",
    },
    {
      id: "cadeirante",
      nome: "Cadeirante",
    },
  ];

  const initialForm = {
    nome: "",
    telefone: "",

    cep: "",
    endereco: "",
    numero: "",

    bairro: "",
    cidade: "",
    estado: "",
    destino: "",

    situacao: "",
    observacao: "",
  };

  const [form, setForm] = useState(initialForm);

  function alterarCampo(campo: string, valor: string) {
    setForm((prev) => ({
      ...prev,

      [campo]: valor,
    }));
  }

  async function buscarCep(cep: string) {
    if (cep.length !== 8) return;

    try {
      const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

      const dados = await resposta.json();

      if (!dados.erro) {
        setForm((prev) => ({
          ...prev,

          endereco: dados.logradouro,

          bairro: dados.bairro,

          cidade: dados.localidade,

          estado: dados.uf,
        }));
      }
    } catch (error) {
      console.log(error);
    }
  }

  function limpar() {
    setForm(initialForm);
  }

  function salvar() {
    console.log(form);

    alert("Atendimento registrado!");
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Card
          elevation={6}
          sx={{
            borderRadius: 4,

            p: 1,
          }}
        >
          <CardContent>
            <Box
              sx={{
                textAlign: "center",

                mb: 4,
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,

                  color: "primary.main",

                  letterSpacing: 1,
                }}
              >
                Novo Atendimento
              </Typography>
            </Box>

            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 5 }}>
                <TextField
                  fullWidth
                  label="Nome"
                  value={form.nome}
                  onChange={(e) =>
                    alterarCampo(
                      "nome",

                      e.target.value,
                    )
                  }
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 3 }}>
                <TextField
                  fullWidth
                  label="Telefone"
                  value={form.telefone}
                  onChange={(e) => {
                    const valor = e.target.value.replace(/\D/g, "");

                    alterarCampo(
                      "telefone",

                      valor,
                    );
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 2 }}>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checkedAcompanhante}
                        onChange={(e) =>
                          setCheckedAcompanhante(e.target.checked)
                        }
                      />
                    }
                    label="Acompanhante"
                  />
                </FormGroup>
              </Grid>

              <Grid size={{ xs: 12, sm: 4 }}>
                <TextField
                  fullWidth
                  label="CEP"
                  value={form.cep}
                  slotProps={{
                    htmlInput: {
                      maxLength: 8,
                    },
                  }}
                  onChange={(e) => {
                    let valor = e.target.value.replace(/\D/g, "");

                    valor = valor.substring(0, 8);

                    alterarCampo(
                      "cep",

                      valor,
                    );

                    if (valor.length === 8) {
                      buscarCep(valor);
                    }
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 8 }}>
                <TextField
                  fullWidth
                  label="Endereço"
                  value={form.endereco}
                  onChange={(e) =>
                    alterarCampo(
                      "endereco",

                      e.target.value,
                    )
                  }
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 2 }}>
                <TextField
                  fullWidth
                  label="Número"
                  value={form.numero}
                  onChange={(e) =>
                    alterarCampo(
                      "numero",

                      e.target.value,
                    )
                  }
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 5 }}>
                <TextField
                  fullWidth
                  label="Bairro"
                  value={form.bairro}
                  onChange={(e) =>
                    alterarCampo(
                      "bairro",

                      e.target.value,
                    )
                  }
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 5 }}>
                <TextField
                  fullWidth
                  label="Cidade"
                  value={form.cidade}
                  onChange={(e) =>
                    alterarCampo(
                      "cidade",

                      e.target.value,
                    )
                  }
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 2 }}>
                <TextField
                  fullWidth
                  label="Estado"
                  value={form.estado}
                  onChange={(e) =>
                    alterarCampo(
                      "estado",

                      e.target.value,
                    )
                  }
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 10 }}>
                <TextField
                  fullWidth
                  label="Destino"
                  value={form.destino}
                  onChange={(e) =>
                    alterarCampo(
                      "destino",

                      e.target.value,
                    )
                  }
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  select
                  fullWidth
                  label="Situação"
                  value={form.situacao}
                  onChange={(e) =>
                    alterarCampo(
                      "situacao",

                      e.target.value,
                    )
                  }
                >
                  {situacoes.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.nome}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Observação"
                  value={form.observacao}
                  onChange={(e) =>
                    alterarCampo(
                      "observacao",

                      e.target.value,
                    )
                  }
                />
              </Grid>
            </Grid>

            <Stack
              direction={{
                xs: "column",

                sm: "row",
              }}
              spacing={3}
              sx={{
                justifyContent: "center",

                mt: 5,
              }}
            >
              <Button
                variant="contained"
                size="large"
                startIcon={<Save />}
                onClick={salvar}
                sx={{
                  px: 5,

                  borderRadius: 3,

                  fontWeight: "bold",
                }}
              >
                Gerar Atendimento
              </Button>

              <Button
                variant="outlined"
                color="error"
                size="large"
                startIcon={<Clear />}
                onClick={limpar}
                sx={{
                  px: 5,

                  borderRadius: 3,

                  fontWeight: "bold",
                }}
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
