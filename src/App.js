import React, { useEffect, useState } from 'react';
import MapComponent from './components/MapComponent';
import AddPointModal from './components/AddPointModal';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);

  // Função para carregar dados da API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/category-points');
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

  // funçao para filtra a categoria
  const filterCategory = async (category) => {
    try{
      
      const response = await axios.get('http://localhost:8000/api/category', category);
      console.log(response)
      // Atualizar a lista de pontos
      setData([...data, response.data]);
    } catch (error) {
      console.error('Erro ao selecionar categoria:', error);
    }
  };

  const showModal = async () => {
    setOpen(true);
  };

  return (
    <div>
      <h2>Projeto CityMap</h2>
      {data.map(point => (
        <div key={point.id}>
          <h2>{point.category}</h2>
          <button onClick={() => filterCategory({ category: point.category })}>
        Selecionar a categoria
      </button>
        </div>
      ))}
      <button onClick={showModal}>
        Adicionar Ponto
      </button>
      <AddPointModal onSubmit={addPoint} visible={open} />
      <MapComponent points={data} />
    </div>
  );
}

export default App;
