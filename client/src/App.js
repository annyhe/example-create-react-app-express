import React, { Component } from "react";
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

// (marginRight ? ' style="margin-right:' + marginRight + ';"' : "") +
const Card = ({ rank }) => {
  const num = parseInt(rank, 10);
  const displayNum = (num % 12) + 1
  const suit = Math.floor(num / 13);
  let suitGraphic;
  let suitName;
  if (suit === 0) {
    suitGraphic = <span>&clubs;</span>;
    suitName = 'clubs'
  } else if (suit === 1) {
    suitGraphic = <span>&spades;</span>;
    suitName = 'spades'
  } else if (suit === 2) {
    suitGraphic = <span>&diams;</span>;
    suitName = 'diams'
  } else {
    // suit === 3
    suitGraphic = <span>&hearts;</span>;
    suitName = 'hearts'
  }

  return <div className={"card " + suitName} style={{marginRight:'-107px'}}>
    <div className="top_rank">{displayNum}</div>
    <div className="top_suit">{suitGraphic}</div>
    <div className="suit">{suitGraphic}</div>
    <div className="bottom_suit">{suitGraphic}</div>
    <div className="bottom_rank">{displayNum}</div>
  </div>; 
};
class App extends Component {
  state = {
    cards: getNewDeck()
  };
  top_card = () => {
    if (this.state.cards.length === 0) return false;
    const copy = [...this.state.cards]
    copy.pop()
    this.setState({ cards: copy});
    return true;
  };
  new_deck_click = () => {
    this.setState({ cards: shuffle(getNewDeck()) });
  };
  shuffle_deck_click = () => {
    const shuffledDeck = shuffle(this.state.cards)
    this.setState({cards: shuffledDeck})
  };
  top_card_deck_click = () => {
    //   TODO: animate card being removed
      if (!this.top_card()) {
        if (
          window.confirm("You don't have any cards left. Would you like a new Deck?")
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
        {this.state.cards.map(card => (
          <Card key={card} rank={card} />
        ))}
      </div>
    );
  }
}

export default App;
