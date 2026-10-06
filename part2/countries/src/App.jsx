import { useState, useEffect } from 'react'
import SearchFilter from '../components/SearchFilter'

function App() {
  const [searchName, setSearchName] = useState('')
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [weather, setWeather] = useState(null)
  const [weatherError, setWeatherError] = useState(null)
  
  useEffect(() => {
    fetch('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => response.json())
      .then(data => setCountries(data))
      .catch(error => console.error('Error al cargar países:', error))
  }, [])

  useEffect(() => {
    if (!selectedCountry) return

    const capital = selectedCountry.capital?.[0]
    const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY

    if (!capital || !apiKey) return

    const controller = new AbortController()

    const fetchWeather = async () => {
      try {
        const location = encodeURIComponent(`${capital},${selectedCountry.cca2}`)
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`,
          { signal: controller.signal }
        )
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.message || 'No se pudo obtener el informe meteorológico.')
        }

        setWeather(data)
      } catch (error) {
        if (error.name !== 'AbortError') {
          setWeatherError(error.message)
        }
      }
    }

    fetchWeather()

    return () => controller.abort()
  }, [selectedCountry])

  const matches = countries.filter(country =>
    country.name.common.toLowerCase().includes(searchName.toLowerCase())
  )
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY
  const weatherUnavailableMessage = selectedCountry && !selectedCountry.capital?.[0]
    ? 'No hay una capital disponible para este país.'
    : selectedCountry && !apiKey
      ? 'Configura VITE_OPENWEATHER_API_KEY para consultar el tiempo.'
      : null

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
            <button
              onClick={() => {
                setSelectedCountry(country)
                setWeather(null)
                setWeatherError(null)
              }}
            >
              Show
            </button>
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
          <h2>Weather in {selectedCountry.capital?.[0] || selectedCountry.name.common}</h2>
          {weatherUnavailableMessage && <p>{weatherUnavailableMessage}</p>}
          {weatherError && <p>{weatherError}</p>}
          {!weather && !weatherError && !weatherUnavailableMessage && <p>Loading weather...</p>}
          {weather && (
            <div>
              <p>Temperature: {weather.main.temp} °C</p>
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
              />
              <p>Wind: {weather.wind.speed} m/s</p>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default App
