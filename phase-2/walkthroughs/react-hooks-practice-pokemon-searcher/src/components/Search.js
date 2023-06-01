import React from "react";

function Search({ searchInput, setSearchInput }) {
  return (
    <div className="ui search">
      <div className="ui icon input">
        <input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="prompt"
        />
        <i className="search icon" />
      </div>
    </div>
  );
}

export default Search;
