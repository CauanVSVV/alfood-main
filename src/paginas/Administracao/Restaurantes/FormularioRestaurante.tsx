import { Button, TextField } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const FormularioRestaurante = () => {
  const parametros = useParams()

  useEffect(() => {
    if(parametros.id) {
      axios.get(`http://localhost:8000/api/v2/restaurantes/${parametros.id}/`)
        .then(resposta => setNomeRestaurantes(resposta.data.nome))
    }
  }, [parametros])

  const [nomeRestautante, setNomeRestaurantes] = useState('')

  const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault()

    if (parametros.id) {
      axios.put(`http://localhost:8000/api/v2/restaurantes/${parametros.id}/`, {
          nome: nomeRestautante
      })
      .then(() => {
          alert('Restaurante atualizado com sucesso!')
      })
    } else {
      axios.post('http://localhost:8000/api/v2/restaurantes/', {
          nome: nomeRestautante
      })
      .then(() => {
          alert('Restaurante cadastrado com sucesso!')
      })
    }

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