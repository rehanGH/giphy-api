import React, { Component } from "react";

export default class Gif extends Component {

  render() {
    console.log("one gif")
    return (
      <video loop autoPlay>
      <source src={this.props.gif} type="video/mp4" />
    </video>
    )

  }

}


