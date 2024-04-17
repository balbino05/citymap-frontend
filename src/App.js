import React, { useEffect, useState } from 'react';
import MapComponent from './components/MapComponent';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);

  // Função para carregar dados da API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/category-points');
        const data = response.data;
        console.log(data);
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
      const response = await axios.post('http://localhost:8000/api/interest-points', point);
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
          <h2>{point.category}</h2>
        </div>
      ))}
      <button onClick={() => addPoint({ name: 'Novo Ponto3', address: 'Endereço Exemplo2', latitude: 35.05, longitude: -118.25, category: 'Alimentaçao' })}>
        Adicionar Ponto
      </button>
      <MapComponent points={data} />
    </div>
  );
}

export default App;
