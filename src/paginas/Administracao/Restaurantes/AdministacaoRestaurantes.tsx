import React, { useEffect, useState } from 'react'
import IRestaurante from '../../../interfaces/IRestaurante'
import { Paper, Table, TableCell, TableBody, TableContainer, TableHead, TableRow } from '@mui/material'
import axios from 'axios'

const AdministacaoRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])

  useEffect(() => {
    axios.get('http://localhost:8000/api/v2/restaurantes/')
    .then(resposta => setRestaurantes(resposta.data))
    .catch(erro => console.log(erro))
  })

  return (
    <TableContainer component={Paper}>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Nome</TableCell>
                </TableRow>
            </TableHead>           
            <TableBody>
                {restaurantes.map(restaurante => 
                    <TableRow key={restaurante.id}>
                        <TableCell>{restaurante.nome}</TableCell>
                    </TableRow>              
                )}
            </TableBody>
        </Table>
    </TableContainer>
  )
}

export default AdministacaoRestaurantes