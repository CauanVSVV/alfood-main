import { Button, TextField } from '@mui/material'
import axios from 'axios'
import { useState } from 'react'

const FormularioRestaurante = () => {
  const [nomeRestautante, setNomeRestaurantes] = useState('')

  const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault()

    axios.post('http://localhost:8000/api/v2/restaurantes/', {
        nome: nomeRestautante
    })
    .then(() => {
        alert('Restaurante cadastrado com sucesso!')
    })
  }


  return (
    <form onSubmit={aoSubmeterForm}>
        <TextField 
          value={nomeRestautante} 
            onChange={ evento => setNomeRestaurantes(evento.target.value) }  
            label="Nome do restaurante" 
            variant="standard" />
        <Button type='submit' variant="outlined">Salvar</Button>
    </form>
  )
}

export default FormularioRestaurante