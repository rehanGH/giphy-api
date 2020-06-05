import React, { Component } from 'react'
import {Button} from "react-bootstrap"

const SearchField = ({ value, onChange, onSearch }) => {
    return (
      <div className="search">
        <input value={value} onChange={onChange} />
        <Button onClick={onSearch}>Search</Button>
      </div>
    );
  };

export default SearchField