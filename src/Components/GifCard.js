import React, { Component } from "react";
import SearchField from "./SearchField";
// import Trending from "./Trending";
// import { Jumbotron } from "react-bootstrap";

import axios from "axios";

import Gif from "./gif";
import Gifs from "./gifs";

const API_KEY = "fQNPzeLzerClCIKPpsWdDc2HeRpuOD4e"
const trendingURL = `http://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}`;
const randomURL = `http://api.giphy.com/v1/gifs/random?api_key=${API_KEY}`;

export default class GifCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: "",
      random: "",
      searchInput: "",
      gifs: [],
      search: [],
      word: "",
    };
  }

  componentDidMount() {
    console.log("in comp did mount")
    axios
    .get(trendingURL)
    .then((response) => {
      const { data } = response.data;
      const gifs = data.map((val) => {
        return val.images.fixed_width.mp4;
      });
      this.setState({
        gifs: gifs,
      });
    })
    .catch((err) => {
      console.log(err);
    });
  }

  handleInput = (event) => {
    this.setState({ searchInput: event.target.value });
  };

  handleSearch = () => {
    this.setState({
      random: "",
      display: "search"
    })
    const searchInput = this.state.searchInput;
    const url = `http://api.giphy.com/v1/gifs/search?q=${searchInput}&api_key=${API_KEY}`;
    axios
      .get(url)
      .then((response) => {
        // console.log(url);
        const { data } = response.data;

        const gifs = data.map((val) => {
          return val.images.fixed_width.mp4;
        });
        // console.log(gifs)
                this.setState({
          word: searchInput,
          search: [...gifs],
          gifs:[],
          // random: "",
          searchInput: "",
          // display: "search",
          searched: gifs[0]
        });

      })
      .catch((err) => {
       console.log(err);
      });
  };

  handleRandom = () => {
    axios
      .get(randomURL)
      .then((response) => {
        const { data } = response.data;
        console.log(data);
        this.setState({
          random: data.images.fixed_width.mp4,
          // ranState: true,
          display: "random",
          gifs: [],
        });
        console.log(this.state.random);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  helper = (url) => {
    const searchInput = this.state.searchInput;
    axios
      .get(url)
      .then((response) => {
        const { data } = response.data;
        console.log(data);
        const gifs = data.map((val) => {
          return val.images.fixed_width.mp4;
        });
        this.setState({
          word: searchInput,
          gifs: gifs,
          searchInput: "",
          trending: true,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {

    return (
      <div>
        <div className="gif">
          <h1 className="header">Giphy Searcher</h1>
          {
            <SearchField
              value={this.state.searchInput}
              onChange={this.handleInput}
              async onSearch={this.handleSearch}
              onRandom={this.handleRandom}
            />
          }
          <h3>{this.state.word}</h3>
        </div>


        {
          this.state.display === "random"? <Gif gif = {this.state.random}/>: <Gifs values={{trending:this.state.gifs, display: this.state.display, search:this.state.search}} />
        }
      </div>
    );
  }
}


