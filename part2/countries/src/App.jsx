import { useState, useEffect } from 'react'
import SearchFilter from '../components/SearchFilter'

function App() {
  const [searchName, setSearchName] = useState('')
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)
  
  useEffect(() => {
    fetch('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => response.json())
      .then(data => setCountries(data))
      .catch(error => console.error('Error al cargar países:', error))
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
      {matches.length <= 10 ? (
        matches.map((country) => (
          <div key={country.name.common} className="country-item">
            <p>{country.name.common}</p>
            <button onClick={() => setSelectedCountry(country)}>Show</button>
          </div>
        ))
      ) : null}
      {selectedCountry && (
        <div>
          <h2>{selectedCountry.name.common}</h2>
          <p>Capital: {selectedCountry.capital?.join(', ') || 'Unknown'}</p>
          <p>Area: {selectedCountry.area} km²</p>
          <h3>Languages</h3>
          <ul>
            {Object.values(selectedCountry.languages || {}).map((language) => (
              <li key={language}>{language}</li>
            ))}
          </ul>
          <img
            src={selectedCountry.flags.png}
            alt={selectedCountry.flags.alt || `Flag of ${selectedCountry.name.common}`}
          />
        </div>
      )}
    </>
  )
}

export default App
