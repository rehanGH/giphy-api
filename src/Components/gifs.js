import React, { Component } from "react";
// import SearchField from "./SearchField";
// // import Trending from "./Trending";
// // import { Jumbotron } from "react-bootstrap";
// import axios from "axios";

// const API_KEY = "fQNPzeLzerClCIKPpsWdDc2HeRpuOD4e"
// const trendingURL = `http://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}`;
// const randomURL = `http://api.giphy.com/v1/gifs/random?api_key=${API_KEY}`;

export default class Gifs extends Component {
  constructor(props) {
    super(props);
    console.log("herehhrehrhe")
    console.log(this.props.values.display)
  }
  render() {

    return (
      <div>
        {
          this.props.values.display === "search" ? (
            <div>
            {
              this.props.values.search.map((gif) => {
                return (
                  <video loop autoPlay>
                    <source src={gif} type="video/mp4" />
                  </video>
                );
              })
            }
          </div>
          ) : (
            <div>
            {
              this.props.values.trending.map((gif) => {
                return (
                  <video loop autoPlay>
                    <source src={gif} type="video/mp4" />
                  </video>
                );
              })
            }
          </div>
          )
        }
      </div>
    )
  }

}


