import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addPerson = (event) => {
    event.preventDefault()

    const name = newName.trim()
    if (!name) return

    const alreadyAdded = persons.find(
      (person) => person.name.toLowerCase() === name.toLowerCase()
    )

    if (alreadyAdded) {
      alert(`${name} is already added to phonebook`)
      setNewName('')
      return
    }

    setPersons((currentPersons) => currentPersons.concat({ name, number: newNumber }))
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name:{' '}
          <input
            value={newName}
            onChange={(event) => setNewName(event.target.value)}
          />
        </div>
        <div> number: <input
          value={newNumber}
          onChange={(event) => setNewNumber(event.target.value)}
        /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => <p key={person.name}>{person.name}: {person.number}</p>)}
    </div>
  )
}

export default App