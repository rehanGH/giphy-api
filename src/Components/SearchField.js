import React from "react";
import {Button} from "react-bootstrap"

const SearchField = ({ value, onChange, onSearch, onRandom }) => {
    return (
      <div className="search">
        Enter Anything: <input placeholder="cat" value={value} onChange={onChange} />
        <Button onClick={onSearch}>Search</Button>
        <Button onClick={onRandom}>Random</Button>
      </div>
    );
  };

export default SearchField