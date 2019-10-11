import React from "react";

const Card = ({ rank }) => {
  const num = parseInt(rank, 10);
  const displayNum = (num % 12) + 1;
  const suit = Math.floor(num / 13);
  let suitGraphic;
  let suitName;
  if (suit === 0) {
    suitGraphic = <span>&clubs;</span>;
    suitName = "clubs";
  } else if (suit === 1) {
    suitGraphic = <span>&spades;</span>;
    suitName = "spades";
  } else if (suit === 2) {
    suitGraphic = <span>&diams;</span>;
    suitName = "diams";
  } else {
    // suit === 3
    suitGraphic = <span>&hearts;</span>;
    suitName = "hearts";
  }

  return (
    <div className={"card " + suitName} style={{ marginRight: "-107px" }}>
      <div className="top_rank">{displayNum}</div>
      <div className="top_suit">{suitGraphic}</div>
      <div className="suit">{suitGraphic}</div>
      <div className="bottom_suit">{suitGraphic}</div>
      <div className="bottom_rank">{displayNum}</div>
    </div>
  );
};

export default Card;