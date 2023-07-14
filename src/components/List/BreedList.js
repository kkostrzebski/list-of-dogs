import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const BreedList = () => {
  const [breeds, setBreeds] = useState([])

  useEffect(() => {
    // Efekt używany do pobrania listy ras psów po załadowaniu komponentu
    axios
      .get('https://dog.ceo/api/breeds/list/all') // Wywołanie API, które zwraca listę ras psów
      .then(response => {
        const breedsData = Object.keys(response.data.message) // Pobranie nazw ras psów z odpowiedzi API
        setBreeds(breedsData) // Aktualizacja stanu z listą ras psów
      })
      .catch(error => {
        console.error('Błąd pobierania listy ras psów:', error) // Obsługa błędu w przypadku nieudanego żądania API
      })
  }, [])

  return (
    <div>
      {/* Nagłówek */}
      <h1 className='breed-list-title'>Lista ras psów</h1>
      
      {/* Lista ras psów */}
      <ul className='breed-list'>
        {breeds.map(breed => (
          <li key={breed}>
            {/* Linki do wyszukiwania konkretnych ras psów */}
            <Link to={`/search?breed=${breed}`}>{breed}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default BreedList