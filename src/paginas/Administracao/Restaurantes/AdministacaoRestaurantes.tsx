import React, { useEffect, useState } from 'react'
import IRestaurante from '../../../interfaces/IRestaurante'
import { Paper, Table, TableCell, TableBody, TableContainer, TableHead, TableRow, Button } from '@mui/material'
import { Link } from 'react-router-dom'
import http from '../../../http'

const AdministacaoRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])

  useEffect(() => {
    http.get('restaurantes/')
    .then(resposta => setRestaurantes(resposta.data))
    .catch(erro => console.log(erro))
  })

  const excluir = (restauranteASerExcluido: IRestaurante) => {
    http.delete(`restaurantes/${restauranteASerExcluido.id}/`)
    .then(() => {
      const listaRestaurante = restaurantes.filter(restaurante => restaurante.id !== restauranteASerExcluido.id)
      setRestaurantes([...listaRestaurante])
    })
    .catch(erro => console.log(erro))
  }

  return (
    <TableContainer component={Paper}>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Nome</TableCell>
                    <TableCell>Editar</TableCell>
                    <TableCell>Excluir</TableCell>
                </TableRow>
            </TableHead>           
            <TableBody>
                {restaurantes.map(restaurante => 
                    <TableRow key={restaurante.id}>
                        <TableCell>{restaurante.nome}</TableCell>
                        <TableCell>[ <Link to={`/admin/restaurantes/${restaurante.id}`}>Editar</Link> ]</TableCell>
                        <TableCell>
                            <Button variant="outlined" color="error" onClick={() => excluir(restaurante)}>Excluir</Button>
                        </TableCell>
                    </TableRow>              
                )}
            </TableBody>
        </Table>
    </TableContainer>
  )
}

export default AdministacaoRestaurantes