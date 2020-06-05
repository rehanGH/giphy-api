import React, { Component } from "react";
import SearchField from "./SearchField";
import axios from "axios";

export default class GifCard extends Component {
  constructor(props) {
    super(props);
    this.state = { searchInput: "", gifs: [], word: "" };
  }

  handleInput = (event) => {
    this.setState({ searchInput: event.target.value });
  };

  handleSearch = () => {
    const searchInput = this.state.searchInput;
    const API_KEY = process.env.REACT_APP_KEY;
    const url = `http://api.giphy.com/v1/gifs/search?q=${searchInput}&api_key=${API_KEY}`;

    axios
      .get(url)
      .then((response) => {
        const { data } = response.data;
        console.log(data);
        const gifs = data.map((val) => {
          console.log("val", val);
          console.log("og", val.images.original.mp4);
          return val.images.original.mp4;
        });

        this.setState({ word: searchInput, gifs: gifs, searchInput: "" });
      })
      .catch((err) => {
        console.log(err);
        // this.setState({ definitions: [] });
      });
  };

  render() {
    // let gifList;
    // if (this.state.gifs.length === 0) {
    //   return <></>;
    // } else {
    return (
      <div>
        <div className="gif">
          <h1>Giphy Searcher</h1>
          <SearchField
            value={this.state.searchInput}
            onChange={this.handleInput}
            onSearch={this.handleSearch}
          />
          <h3>{this.state.word}</h3>
          {/* {gifList} */}
        </div>
        <ol>
          {this.state.gifs.map((gif, index) => {
            
            return (
            <video loop autoPlay>
            <source src={gif} type="video/mp4" />
             {/* <li key={index}>{gif}</li> */}
             </video>
            )
          })}
        </ol>
      </div>
    );
  }
}
