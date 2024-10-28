import React, { useState } from "react";

const suits = ["hearts", "spades", "diamonds", "clubs"];
const values = [
  { value: 2, name: "2" },
  { value: 3, name: "3" },
  { value: 4, name: "4" },
  { value: 5, name: "5" },
  { value: 6, name: "6" },
  { value: 7, name: "7" },
  { value: 8, name: "8" },
  { value: 9, name: "9" },
  { value: 10, name: "10" },
  { value: 10, name: "J" },
  { value: 10, name: "Q" },
  { value: 10, name: "K" },
  { value: 11, name: "A" }
];

// Helper function to get a random card
const getRandomCard = () => {
  const suit = suits[Math.floor(Math.random() * suits.length)];
  const value = values[Math.floor(Math.random() * values.length)];
  return { suit, ...value };
};

// Calculate the total score
const calculateScore = (cards) => {
  let score = cards.reduce((acc, card) => acc + card.value, 0);
  let aceCount = cards.filter((card) => card.name === "A").length;

  // Adjust score for aces (can be 1 or 11)
  while (score > 21 && aceCount > 0) {
    score -= 10;
    aceCount--;
  }

  return score;
};

const Blackjack = () => {
  const [playerCards, setPlayerCards] = useState([]);
  const [dealerCards, setDealerCards] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState("");

  // Function to start the game
  const startGame = () => {
    setPlayerCards([getRandomCard(), getRandomCard()]);
    setDealerCards([getRandomCard(), getRandomCard()]);
    setGameOver(false);
    setWinner("");
  };

  // Player chooses to hit (get another card)
  const playerHit = () => {
    const newCard = getRandomCard();
    const updatedPlayerCards = [...playerCards, newCard];
    setPlayerCards(updatedPlayerCards);

    const playerScore = calculateScore(updatedPlayerCards);
    if (playerScore > 21) {
      setGameOver(true);
      setWinner("Dealer");
    }
  };

  // Player stands, dealer's turn
  const playerStand = () => {
    let updatedDealerCards = [...dealerCards];
    while (calculateScore(updatedDealerCards) < 17) {
      updatedDealerCards.push(getRandomCard());
    }
    setDealerCards(updatedDealerCards);
    determineWinner(updatedDealerCards);
  };

  // Determine the winner
  const determineWinner = (updatedDealerCards) => {
    const playerScore = calculateScore(playerCards);
    const dealerScore = calculateScore(updatedDealerCards);

    setGameOver(true);

    if (dealerScore > 21 || playerScore > dealerScore) {
      setWinner("Player");
    } else if (dealerScore === playerScore) {
      setWinner("Tie");
    } else {
      setWinner("Dealer");
    }
  };

  return (
    <div className="blackjack-game">
      <h1>Blackjack</h1>

      <div className="game-area">
        <div className="dealer">
          <h2>Dealer's Cards</h2>
          <div className="cards">
            {dealerCards.map((card, index) => (
              <div key={index} className="blackjackCard">
                {card.name} of {card.suit}
              </div>
            ))}
          </div>
          <p>Dealer's Score: {calculateScore(dealerCards)}</p>
        </div>

        <div className="player">
          <h2>Your Cards</h2>
          <div className="cards">
            {playerCards.map((card, index) => (
              <div key={index} className="blackjackCard">
                {card.name} of {card.suit}
              </div>
            ))}
          </div>
          <p>Your Score: {calculateScore(playerCards)}</p>
        </div>
      </div>

      {!gameOver ? (
        <div className="controls">
          <button onClick={playerHit}>Hit</button>
          <button onClick={playerStand}>Stand</button>
        </div>
      ) : (
        <div className="game-over">
          <h2>Game Over: {winner} wins!</h2>
          <button onClick={startGame}>Play Again</button>
        </div>
      )}

      {!gameOver && playerCards.length === 0 && (
        <button onClick={startGame}>Start Game</button>
      )}
    </div>
  );
};

export default Blackjack;
