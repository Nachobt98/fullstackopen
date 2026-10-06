import DeleteButton from './DeleteButton'

const ShowPersons = ({ persons, setPersons }) => {
  return (
    <div>
        <h2>Numbers</h2>
          {persons.map((person) => (
        <p key={person.id}>
          {person.name}: {person.number}  
          <DeleteButton person={person} setPersons={setPersons} />
        </p>
        

      ))}
    </div>
  )
}

export default ShowPersons