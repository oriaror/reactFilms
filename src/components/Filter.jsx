const Filter = ({ setFilter, setCurrentPage }) => {
  const handleFilter = (event) => {
    setFilter(event.target.value);
    setCurrentPage(1);
  };

  return (
    <form className="filters">
      <p>
        <label>
          <input
            className="with-gap"
            name="filter"
            type="radio"
            value={""}
            onChange={handleFilter}
            defaultChecked
          />
          <span>All</span>
        </label>
      </p>
      <p>
        <label>
          <input
            className="with-gap"
            name="filter"
            type="radio"
            value={"movie"}
            onChange={handleFilter}
          />
          <span>Movie</span>
        </label>
      </p>
      <p>
        <label>
          <input
            className="with-gap"
            name="filter"
            type="radio"
            value={"series"}
            onChange={handleFilter}
          />
          <span>Series</span>
        </label>
      </p>
    </form>
  );
};

export default Filter;
