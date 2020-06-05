import React, { Component } from 'react';
import GifCard from "./Components/GifCard"
import SearchField from "./Components/SearchField"
import './App.css';

class App extends Component {
  render(){
    return (
      <div className="App">
        <h1>Hello</h1>
        <GifCard />
      </div>
    );
  }
}

export default App;
