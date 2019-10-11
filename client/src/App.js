import React, { Component } from "react";

import logo from "./logo.svg";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div class="actions">
          <a id="new_deck" class="enabled" href="">
            New Deck
          </a>
          <a id="shuffle_deck" href="">
            Shuffle
          </a>
          <a id="top_card_deck" href="">
            Discard Top Card
          </a>
        </div>
        <div id="cards"></div>
      </div>
    );
  }
}

export default App;
