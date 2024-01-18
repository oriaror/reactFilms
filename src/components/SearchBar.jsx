const SearchBar = ({ handleOnClick, title, setTitle, clearData }) => {
  return (
    <div>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button
        className="btn"
        onClick={() => {
          clearData();
          handleOnClick();
        }}
        style={{
          position: "relative",
        }}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
