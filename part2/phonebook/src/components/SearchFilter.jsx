const SearchFilter = ({ filter, handleFilterChange }) => {
  return (
    <div>
      <input
        placeholder="filter shown with"
        value={filter}
        onChange={handleFilterChange}
      />
    </div>
  )
}

export default SearchFilter