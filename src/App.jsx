import { useState, useEffect } from 'react'

function App() {
  const [animals, setAnimalS] = useState([]);

  useEffect(() => {
    const lastQuery = localStorage.getItem('lastQuery');
    search(lastQuery);
  }, []);

  const search = async (q) => {
    const response = await fetch(
      'http://localhost:8080?' + new URLSearchParams({ q })
    );
    const data  = await response.json();
    setAnimalS(data);

    localStorage.setItem('lastQuery', q);
  };

  return (
    <main>
        <h1>Animal Farm</h1>

        <input 
          type="text" 
          placeholder='Search'
          onChange={(e) => search(e.target.value)}
        />

        <ul>
          {animals.map((animal) => (
            <Animal key={animal.id} {...animal} />
           ))}
        </ul>

    </main>
  )
}

function Animal({ type, name, age}) {
  return (
    <li>
      <strong>{type}</strong> {name} ({age} years old)
    </li>
  );
}

export default App
