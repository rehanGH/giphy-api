import React, { Component } from "react";
import SearchField from "./SearchField";
// import Trending from "./Trending";
// import { Jumbotron } from "react-bootstrap";
import axios from "axios";

const API_KEY = process.env.REACT_APP_KEY;
const trendingURL = `http://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}`;
const randomURL = `http://api.giphy.com/v1/gifs/random?api_key=${API_KEY}`;

export default class GifCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trending: true,
      // ranState: false,
      random: "",
      searchInput: "",
      gifs: [],
      word: "",
    };
  }

  componentDidMount() {
    axios
    .get(trendingURL)
    .then((response) => {
      const { data } = response.data;
      console.log(data);
      const gifs = data.map((val) => {
        return val.images.fixed_width.mp4;
      });
      this.setState({
        gifs: gifs,
        trending: true,
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
    const searchInput = this.state.searchInput;
    const url = `http://api.giphy.com/v1/gifs/search?q=${searchInput}&api_key=${API_KEY}`;
    // this.setState({
    //   trending: true,
    // });
    // this.helper(url);
    axios
      .get(url)
      .then((response) => {
        console.log(url);
        const { data } = response.data;
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

  handleRandom = () => {
    // this.setState({
    //   ranState: true,
    //   trending: false,
    // });
    axios
      .get(randomURL)
      .then((response) => {
        const { data } = response.data;
        console.log(data);
        this.setState({
          random: data.images.fixed_width.mp4,
          ranState: true,
          trending: false,
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
    // let gifList;
    // if (this.state.gifs.length === 0) {
    //   return <></>;
    // } else {
    // if (!this.state.trending) {
    //   return (
    //     <div>
    //       <div className="gif">
    //         <h1>Giphy Searcher</h1>
    //         {
    //           <SearchField
    //             value={this.state.searchInput}
    //             onChange={this.handleInput}
    //             onSearch={this.handleSearch}
    //             onRandom={this.handleRandom}
    //           />
    //         }
    //         <h3>{this.state.word}</h3>
    //       </div>
    //     </div>
    //   );
    // }
    
    return (
      <div>
        <div className="gif">
          <h1>Giphy Searcher</h1>
          {
            <SearchField
              value={this.state.searchInput}
              onChange={this.handleInput}
              onSearch={this.handleSearch}
              onRandom={this.handleRandom}
            />
          }
          <h3>{this.state.word}</h3>
        </div>
        {this.state.trending ? (
          <ol>
            {this.state.gifs.map((gif) => {
              return (
                <video loop autoPlay>
                  <source src={gif} type="video/mp4" />
                </video>
              );
            })}
          </ol>
        ) : (
          <video loop autoPlay>
            <source src={this.state.random} type="video/mp4" />
          </video>
        )}
      </div>
    );
  }
}

{
  /* <img loop autoPlay></img> */
}
