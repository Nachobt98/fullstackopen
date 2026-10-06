import { useState, useEffect } from 'react'
import SearchFilter from './components/SearchFilter'
import PersonForm from './components/PersonForm'
import ShowPersons from './components/ShowPersons'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [searchName, setSearchName] = useState('')

  const addPerson = (event) => {
    event.preventDefault()

    const name = newName.trim()
    if (!name) return

    const alreadyAdded = persons.find(
      (person) => person.name.toLowerCase() === name.toLowerCase()
    )

    if (alreadyAdded) {
      if (window.confirm(`${name} is already added to phonebook, replace the old number with a new one?`)) {
        personService
          .replaceNumber(alreadyAdded.id, { name, number: newNumber })
          .then((person) => {
            setPersons((currentPersons) => currentPersons.map((p) => (p.id === person.id ? person : p)))
            setNewName('')
            setNewNumber('')
          })
          .catch((error) => {
            console.error('Failed to update person:', error)
            alert('Could not update the person. Please try again.')
          })
      }
      return
    }

      personService
        .create({ name, number: newNumber })
        .then((person) => {
          setPersons((currentPersons) => currentPersons.concat(person))
          setErrorMessage(`Added ${name}`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setNewName('')
          setNewNumber('')
      })
      .catch((error) => {
        console.error('Failed to add person:', error)
        alert('Could not add the person. Please try again.')
      })
  }

  useEffect(() => {

    personService.getAll().then((data) => {
      setPersons(data)
    })
      .catch((error) => {
        console.error('Failed to fetch persons:', error)
        alert('Could not load the phonebook. Please try again.')
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <SearchFilter
        filter={searchName}
        handleFilterChange={(event) => setSearchName(event.target.value)}
      />
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={(event) => setNewName(event.target.value)}
        handleNumberChange={(event) => setNewNumber(event.target.value)}
      />
      <ShowPersons persons={persons.filter((person) => person.name.toLowerCase().includes(searchName.toLowerCase()))} setPersons={setPersons} />
    </div>
  )
}

export default App