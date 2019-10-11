import React, { Component } from "react";
import Card from "./Card";
import "./App.css";

const shuffle = arr => {
  const copyArr = [...arr];
  for (var i = 0; i < copyArr.length; i++) {
    var j = i;
    while (j === i) {
      j = Math.floor(Math.random() * copyArr.length);
    }
    var tmp = copyArr[i];
    copyArr[i] = copyArr[j];
    copyArr[j] = tmp;
  }
  return copyArr;
};

function getNewDeck() {
  return Array(52)
    .fill(0)
    .map((num, index) => index);
}

class App extends Component {
  state = {
    cards: getNewDeck()
  };
  top_card = () => {
    if (this.state.cards.length === 0) return false;
    const copy = [...this.state.cards];
    copy.pop();
    this.setState({ cards: copy });
    return true;
  };
  new_deck_click = () => {
    this.setState({ cards: shuffle(getNewDeck()) });
  };
  shuffle_deck_click = () => {
    const shuffledDeck = shuffle(this.state.cards);
    this.setState({ cards: shuffledDeck });
  };
  top_card_deck_click = () => {
    //   TODO: animate card being removed
    if (!this.top_card()) {
      if (
        window.confirm(
          "You don't have any cards left. Would you like a new Deck?"
        )
      ) {
        this.new_deck_click();
      }
    }
  };

  render() {
    return (
      <div className="App">
        <div className="actions">
          <button
            id="new_deck"
            className="enabled"
            onClick={this.new_deck_click}
          >
            New Deck
          </button>
          <button
            id="shuffle_deck"
            className="enabled"
            onClick={this.shuffle_deck_click}
            disabled={this.state.cards.length === 0}
          >
            Shuffle
          </button>
          <button
            id="top_card_deck"
            className="enabled"
            onClick={this.top_card_deck_click}
          >
            Discard Top Card
          </button>
        </div>
        <div id="cards">
          {this.state.cards.map(card => (
            <Card key={card} rank={card} />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
