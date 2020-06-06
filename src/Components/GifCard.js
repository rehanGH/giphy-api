import React, { Component } from "react";
import SearchField from "./SearchField";
import axios from "axios";

const API_KEY = process.env.REACT_APP_KEY;
const trendUrl = `http://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}`;
const randomUrl = `http://api.giphy.com/v1/gifs/random?api_key=${API_KEY}`;

export default class GifCard extends Component {
  constructor(props) {
    super(props);
    this.state = { searchInput: "", gifs: [], word: "" };
  }

  componentDidMount(){
      axios.get(trendUrl)
      .then((response) => {
          const {data} = response.data;
            const gifs = data.map((val) => {
                return val.images.original.mp4;
              });

        this.setState({gifs: gifs});
    })
    .catch((err) => {
      console.log(err);
    });
};

  handleInput = (event) => {
    this.setState({ searchInput: event.target.value });
  };

  handleSearch = () => {
    const searchInput = this.state.searchInput;
    const regularUrl = `http://api.giphy.com/v1/gifs/search?q=${searchInput}&api_key=${API_KEY}`;
    axios
      .get(regularUrl)
      .then((response) => {
        const { data } = response.data;
        console.log(data);
        const gifs = data.map((val) => {
          return val.images.original.mp4;
        });

        this.setState({ word: searchInput, gifs: gifs, searchInput: "" });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleRandom = () => {
    axios
    .get(randomUrl)
    .then((response) => {
        const {data} = response.data;
        this.setState({result: data.images.original.mp4});
        console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });
};


  render() {
    return (
      <div>
        <div className="gif">
          <h1>Giphy Searcher</h1>
          <SearchField
            value={this.state.searchInput}
            onChange={this.handleInput}
            onSearch={this.handleSearch}
            onRandom={this.handleRandom}
          />
          <h3>{this.state.word}</h3>
        </div>
        <ol>
          {this.state.gifs.map((gif, index) => {
            return (
            <video loop autoPlay>
            <source src={gif} type="video/mp4" />
             </video>
            )
          })}
        </ol>
      </div>
    );
  }
}
