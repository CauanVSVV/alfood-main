import React, { useEffect, useState } from 'react'
import IRestaurante from '../../../interfaces/IRestaurante'
import { Paper, Table, TableCell, TableBody, TableContainer, TableHead, TableRow, Button } from '@mui/material'
import { Link } from 'react-router-dom'
import http from '../../../http'
import IPrato from '../../../interfaces/IPrato'

const AdministracaoPratos = () => {
  const [pratos, setPratos] = useState<IPrato[]>([])

  useEffect(() => {
    http.get<IPrato[]>('pratos/')
    .then(resposta => setPratos(resposta.data))
    .catch(erro => console.log(erro))
  })

  const excluir = (pratoASerExcluido: IPrato) => {
    http.delete(`pratos/${pratoASerExcluido.id}/`)
    .then(() => {
      const listaPratos = pratos.filter(prato => prato.id !== pratoASerExcluido.id)
      setPratos([...listaPratos])
    })
    .catch(erro => console.log(erro))
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            {/* <TableCell>Descrição</TableCell> */}
            <TableCell>Tag</TableCell>
            <TableCell>Imagem</TableCell>
            <TableCell>Editar</TableCell>
            <TableCell>Excluir</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pratos.map((prato) => (
            <TableRow key={prato.id}>
              <TableCell>{prato.nome}</TableCell>
              {/* <TableCell>{prato.descricao}</TableCell> */}
              <TableCell>{prato.tag}</TableCell>
              <TableCell><a href={prato.imagem} target="_blank" rel="noopener noreferrer">Ver imagem</a></TableCell>
              <TableCell>[<Link to={`/admin/pratos/${prato.id}`}>Editar</Link>]</TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => excluir(prato)}
                >
                  Excluir
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default AdministracaoPratos