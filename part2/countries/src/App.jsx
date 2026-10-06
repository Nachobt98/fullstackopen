import { useState, useEffect } from 'react'
import SearchFilter from '../components/SearchFilter'

function App() {
  const [searchName, setSearchName] = useState('')
  const [countries, setCountries] = useState([])
  
useEffect(() => {
  fetch('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then(response => response.json())
    .then(data => setCountries(data))
    .catch(error => console.error('Error al cargar países:', error))
    console.log('Countries data:', countries)
}, [])
const matches = countries.filter(country =>
  country.name.common.toLowerCase().includes(searchName.toLowerCase())
)

  return (
    <>
      <SearchFilter
        filter={searchName}
        handleFilterChange={(event) => setSearchName(event.target.value)}
      />
      {matches.length >= 10 ? (
        matches.map((country) => (
          <div key={country.name.common}>
            <p>{country.name.common}</p>
          </div>
        ))
      ) : (
        matches.length === 1 && (
          <div>
            <h2>{matches[0].name.common}</h2>
            <p>Capital: {matches[0].capital?.join(', ')}</p>
            <p>Área: {matches[0].area}</p>
            <h2>Languages</h2>
            <ul>
              {Object.values(matches[0].languages).map((language) => (
                <li key={language}>{language}</li>
              ))}
            </ul>
            <img src={matches[0].flags.png} alt={`Flag of ${matches[0].name.common}`} />
          </div>
        )
      )}
    </>
  )
}

export default App
