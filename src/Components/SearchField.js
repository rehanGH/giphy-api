import React, { Component } from 'react'

const SearchField = ({ value, onChange, onSearch }) => {
    return (
      <div className="search">
        <input value={value} onChange={onChange} />
        <button onClick={onSearch}>Search</button>
      </div>
    );
  };

export default SearchField