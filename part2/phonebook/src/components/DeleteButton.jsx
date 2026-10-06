import personService from '../services/persons'

const DeleteButton = ({ person, setPersons }) => {
    
  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${person.name}?`)) {
      personService.deletePerson(person.id).then(() => {
        setPersons((currentPersons) => currentPersons.filter((p) => p.id !== person.id))
      })
    }
  }

  return (
    <button onClick={handleDelete}>
      Delete
    </button>
  )
}

export default DeleteButton