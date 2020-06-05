import React, { Component } from 'react'
import SearchField from "./SearchField"

export default class GifCard extends Component{
    constructor(props){
        super(props)
        this.state = {searchInput: "" , gifs: [] , word: ""}
    }
    
    handleInput = (event) => {
        this.setState({ searchInput: event.target.value });
      };

      handleSearch = () => {
        const searchInput = this.state.searchInput;
        const API_KEY = process.env.REACT_APP_KEY;
        const url = `http://api.giphy.com/v1/gifs/search?q=${searchInput}&api_key=`

        axios
        .get((url, {params: {key: API_KEY}})
        .then((response) =>{
            const data = response.data;
            const gifs = data[0].data;
            this.setState({ word})
        })
      }


    render(){
        let gifList;
    if (this.state.gifs.length === 0) {
      gifList = <></>;
    } else {
      gifList = (
        <ol>
          {this.state.gifs.map((gif, index) => {
            return <li key={index}>{gif}</li>;
          })}
        </ol>
      );
    }
        return (
            <div className="gif">
                <h1>Giphy Searcher</h1>
            <SearchField
              value={this.state.searchInput}
              onChange={this.handleInput}
              onSearch={this.handleSearch}
            />
            <img
            src={this.state.gif.imageUrl} />
            <h3>{this.state.word}</h3>
            {gifList}
          </div>
        )
    }
}