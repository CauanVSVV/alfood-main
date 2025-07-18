import { AppBar, Box, Button, Container, TextField, Toolbar, Typography, Link, Paper } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import http from '../../../http'

import { Link as RouterLink } from 'react-router-dom'

const FormularioRestaurante = () => {
  const parametros = useParams()

  useEffect(() => {
    if(parametros.id) {
      http.get(`restaurantes/${parametros.id}/`)
        .then(resposta => setNomeRestaurantes(resposta.data.nome))
    }
  }, [parametros])

  const [nomeRestautante, setNomeRestaurantes] = useState('')

  const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault()

    if (parametros.id) {
      http.put(`restaurantes/${parametros.id}/`, {
          nome: nomeRestautante
      })
      .then(() => {
          alert('Restaurante atualizado com sucesso!')
      })
    } else {
      http.post('restaurantes/', {
          nome: nomeRestautante
      })
      .then(() => {
          alert('Restaurante cadastrado com sucesso!')
      })
    }

  }


  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexGrow: 1,
        }}
      >
        <Typography component="h1" variant="h6">
          Formulário de restaurantes
        </Typography>
        <Box component="form" sx={{ width: "100%" }} onSubmit={aoSubmeterForm}>
          <TextField
            value={nomeRestautante}
            onChange={(evento) => setNomeRestaurantes(evento.target.value)}
            label="Nome do restaurante"
            variant="standard"
            fullWidth
            required
          />
          <Button
            sx={{ marginTop: 1 }}
            type="submit"
            fullWidth
            variant="outlined"
          >
            Salvar
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default FormularioRestaurante