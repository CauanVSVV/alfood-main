import { useEffect, useState } from 'react';
import IRestaurante from '../../../interfaces/IRestaurante';
import Prato from '../Prato';
import estilos from './Restaurante.module.scss';
import IPrato from '../../../interfaces/IPrato';
import axios from 'axios';

interface RestauranteProps {
  restaurante: IRestaurante
}

const Restaurante = ({ restaurante }: RestauranteProps) => {
  const [pratos, setPratos] = useState<IPrato[]>()

  useEffect(() => {
    axios.get<IPrato[]>(`http://localhost:8000/api/v1/restaurantes/${restaurante.id}/pratos/`)
    .then(resposta => {
      setPratos(resposta.data)
    })
    .catch(erro => {
      console.log(erro)
    })
  }, [restaurante.id])

  return (<section className={estilos.Restaurante}>
    <div className={estilos.Titulo}>
      <h2>{restaurante.nome}</h2>
    </div>
    <div>
      {pratos?.map(item => <Prato prato={item} key={item.id}/>)}
    </div>
  </section>)
}

export default Restaurante