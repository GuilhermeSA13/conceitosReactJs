import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepository] = useState([])

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepository(response.data)
    })
  }, [])


  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Novo Repository ${Date.now()}`,
      url: `http://github.com/${Date.now()}`,
      owner: "Guilherme Souza"
    })
    const repository = response.data;
    setRepository([...repositories, repository])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)
    const posicao = repositories.findIndex(repository => repository.id === id)
    repositories.splice(posicao, 1)
    setRepository([...repositories])
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository =>
          <div key={`div${repository.id}`}>
            <li key={repository.id}>{repository.title}</li>
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </div>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
