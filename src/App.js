import React, { useEffect, useState } from 'react';
import MapComponent from './components/MapComponent';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);

  // Função para carregar dados da API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/points');
        console.log('Dados recebidos:', response.data);
        setData(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchData();
  }, []);

  // Função para enviar dados para a API
  const addPoint = async (point) => {
    try {
      const response = await axios.post('http://localhost:8000/api/points', point);
      // Atualizar a lista de pontos
      setData([...data, response.data]);
    } catch (error) {
      console.error('Erro ao adicionar ponto:', error);
    }
  };

  return (
    <div>
      <h2>Projeto CityMap</h2>
      {data.map(point => (
        <div key={point.id}>
          <h2>{point.name}</h2>
          <p>{point.address}</p>
        </div>
      ))}
      <button onClick={() => addPoint({ name: 'Novo Ponto', address: 'Endereço Exemplo', latitude: 34.05, longitude: -118.25, category: 'Tecnologia' })}>
        Adicionar Ponto
      </button>
      <MapComponent points={data} />
    </div>
  );
}

export default App;
