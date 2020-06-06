import React from "react";

const SearchField = ({ value, onChange, onSearch, onRandom }) => {
    return (
      <div className="search">
        <h5>Enter Anything:</h5> 
        <input className="main-input" placeholder="cat" value={value} onChange={onChange} />
        <button className="button" onClick={onSearch}>Search</button>
        <button className="button" onClick={onRandom}>Random</button>
      </div>
    );
  };

export default SearchField

