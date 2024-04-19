import React, { useEffect, useState } from 'react';
import MapComponent from './components/MapComponent';
import AddPointModal from './components/AddPointModal';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const[points, setPoints] = useState([]);

  // Função para carregar dados da API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/category-points');
        setData(response.data);
        const pointsResponse = await axios.get('http://localhost:8000/api/interest-points');
        setPoints(pointsResponse.data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchData();
  }, []);

  // Função para enviar dados para a API
  const addPoint = async (point) => {
    try {
      await axios.post('http://localhost:8000/api/interest-points', point);
    } catch (error) {
      console.error('Erro ao adicionar ponto:', error);
    }
  };

  // funçao para filtra a categoria
  const filterCategory = async (category) => {
    try{
      const response = await axios.post('http://localhost:8000/api/category', category);
      // Atualizar a lista de pontos
      setPoints(response.data);
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
      {data.map(category => (
        <div key={category.id}>
          <h2>{category.name}</h2>
          <button onClick={() => filterCategory(category)}>
        Selecionar a categoria
      </button>
        </div>
      ))}
      <button onClick={showModal}>
        Adicionar Ponto
      </button>
      <AddPointModal onSubmit={addPoint} visible={open} />
      <MapComponent points={points}/>
    </div>
  );
}

export default App;
