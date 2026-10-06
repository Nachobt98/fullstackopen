const SearchFilter = ({ filter, handleFilterChange }) => {
  return (
    <div className="search-filter">
    <p>Filter shown with:</p>
      <input
        value={filter}
        onChange={handleFilterChange}
      />
    </div>
  )
}

export default SearchFilter