import React, { useState } from "react";
import "../../style/SimpleRoulette.css";

const SimpleRoulette = ({ prizes }) => {
  const [activePrizeIndex, setActivePrizeIndex] = useState(null);
  const [winningPrize, setWinningPrize] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const playRoulette = () => {
    if (isSpinning) return; // Prevent multiple clicks during spin

    setIsSpinning(true);
    setWinningPrize(null); // Clear any previous win
    const randomValue = Math.random();

    const prize = prizes.find(prize => randomValue >= prize.chance[0] && randomValue < prize.chance[1]);
    const winningIndex = prizes.indexOf(prize);

    const previousIndex = (winningIndex === 0) ? prizes.length - 1 : winningIndex - 1; // Index of the prize before the winning one
    let currentIndex = activePrizeIndex !== null ? activePrizeIndex : 0; // Start from the current index or 0
    const totalPrizes = prizes.length;
    
    let previousPrizeCount = 0; // Counter for how many times we passed the prize before the winning one
    const maxPreviousPrizePasses = 3; // Number of times to pass the previous prize before stopping

    const spinSpeedStart = 100; // Initial speed of spinning
    let spinSpeed = spinSpeedStart;

    let interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % totalPrizes; // Cycle through prizes
      setActivePrizeIndex(currentIndex); // Highlight current prize

      // Check if we're on the previous prize
      if (currentIndex === previousIndex) {
        previousPrizeCount++; // Increment the counter
      }

      // Stop the spinning after passing the previous prize 3 times
      if (previousPrizeCount >= maxPreviousPrizePasses && currentIndex === winningIndex) {
        clearInterval(interval); // Stop the spinning
        setActivePrizeIndex(winningIndex); // Set the correct winning prize
        setWinningPrize(prize); // Display the winning prize
        setIsSpinning(false); // Allow the user to spin again
      }
    }, spinSpeed);
  };

  return (
    <div className="simpleRouletteWrapper">
      <div className="simpleRoulette">
        {prizes.map((prize, index) => (
          <div
            className={`prizeCard ${index === activePrizeIndex ? "active" : ""}`}
            key={prize.id}
          >
            <img src={prize.image} alt={prize.text} />
            <h2>{prize.text}</h2>
          </div>
        ))}
      </div>
      
      <div className="prizeResultWrapper">
        <button onClick={playRoulette} disabled={isSpinning}>
        {isSpinning ? "Spinning..." : "Spin"}
        </button>
        {winningPrize && (
          <div className="prizeResult">
            <img src={winningPrize.image} alt={winningPrize.text} />
            <h3>You've won: {winningPrize.text}</h3>
        </div>
        )}
      </div>
    </div>
  );
};

export default SimpleRoulette;
