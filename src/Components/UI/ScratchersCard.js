import React, { useEffect, useState } from "react";
import "../../style/ScratchersCard.css";

const createScratchCard = (canvasId, color, onScratchProgress, isPlayable) => {
  let canvas = document.getElementById(canvasId);
  if (!canvas) return;

  let context = canvas.getContext("2d");

  const init = () => {
    context.fillStyle = color;
    context.fillRect(0, 0, 600, 450);
  };

  let isDragging = false;

  const scratch = (x, y) => {
    context.globalCompositeOperation = "destination-out";
    context.beginPath();
    context.arc(x, y, 24, 0, 2 * Math.PI);
    context.fill();
    checkScratchProgress();
  };

  const checkScratchProgress = () => {
    let scratchedPixels = 0;
    let totalPixels = canvas.width * canvas.height;

    let imageData = context.getImageData(0, 0, canvas.width, canvas.height).data;

    for (let i = 3; i < imageData.length; i += 4) {
      if (imageData[i] === 0) {
        scratchedPixels++;
      }
    }

    let scratchedPercentage = (scratchedPixels / totalPixels) * 100;
    onScratchProgress(scratchedPercentage);
  };

  canvas.addEventListener("mousedown", (event) => {
    if (isPlayable) {
      isDragging = true;
      scratch(event.offsetX, event.offsetY);
    }
  });

  canvas.addEventListener("mousemove", (event) => {
    if (isDragging && isPlayable) {
      scratch(event.offsetX, event.offsetY);
    }
  });

  canvas.addEventListener("mouseup", () => {
    isDragging = false;
  });

  init();
};

const ScratchersCard = (props) => {
  const [isCardVisible, setIsCardVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [scratchSize, setScratchSize] = useState("3");
  const [isPlayable, setIsPlayable] = useState(false);
  const [pickedScratchers, setPickedScratchers] = useState([]);
  const [isWinner, setIsWinner] = useState(false);
  const [winPrizes, setWinPrizes] = useState([]);
  const [isScratchingComplete, setIsScratchingComplete] = useState(false);
  const [fastScratching, setFastScratching] = useState(false)

  useEffect(() => {
    createScratchCard(`scratch-card-${props.id}`, "#006d77", handleScratchProgress, isPlayable);
  }, [props.id, isPlayable]);

  const handleScratchProgress = (progress) => {
    if(fastScratching === true ){
      setFadeOut(true);
      setTimeout(() => {
        setIsCardVisible(false);
        setIsScratchingComplete(true);
        checkIfWin();
      }, 500);
    }
    if (progress > 25 && !fadeOut) {
      setFadeOut(true);
      setTimeout(() => {
        setIsCardVisible(false);
        setIsScratchingComplete(true);
        checkIfWin();
      }, 500);
    }
  };

  const handleSizeChange = (event) => {
    if (!isPlayable) { // Zmiana tylko, gdy gra nie jest aktywna
      setScratchSize(event.target.value);
    }
  };

  const fastScratch = () => {
    console.log(fastScratching)
    setFastScratching(prevState => !prevState);
    console.log(fastScratching) // Użycie funkcji aktualizującej
  };

  const playScratch = () => {
    if (isScratchingComplete) {
      resetGame();
    } else {
      startGame();
    }
  };

  const startGame = () => {
    setIsPlayable(true);
    setIsScratchingComplete(false); // Reset scratching completion state
    setIsWinner(false); // Reset win state
    setWinPrizes([]); // Reset win prizes
    setIsCardVisible(true); // Reset card visibility for new round
    props.setIsGameActive(true);

    let availablePicked = [];
    let availablePrizes = [...props.prize];

    for (let i = 0; i < parseInt(scratchSize) * 2; i++) {
      if (availablePrizes.length === 0) break;

      let randomIndex = Math.floor(Math.random() * availablePrizes.length);
      let prize = availablePrizes[randomIndex];
      availablePicked.push(prize);
      
      availablePrizes.splice(randomIndex, 1);
    }
    //! zmienic logike zdrapek zeby bralo z calej puli a nie z kilku
    let picked = [];
    let randomIndex = Math.floor(Math.random() * availablePicked.length);
    let prize = availablePicked[randomIndex];
    picked.push(prize);
    for (let i = 0; i < parseInt(scratchSize); i++) {
      let randomIndex = Math.floor(Math.random() * availablePicked.length);
      let prize = availablePicked[randomIndex];
      picked.push(prize);
      availablePrizes.splice(randomIndex, 1);
    }

    const prizesWithAmounts = assignPrizes(picked);
    setPickedScratchers(prizesWithAmounts);
  };

  const resetGame = () => {
    setIsCardVisible(true);
    setFadeOut(false);
    setPickedScratchers([]);
    setIsPlayable(false); // Wyłączanie opcji gry
    setIsScratchingComplete(false);
    setIsWinner(false);
    setWinPrizes([]);
    props.setIsGameActive(false);
    createScratchCard(`scratch-card-${props.id}`, "#006d77", handleScratchProgress, true);
  };

  const assignPrizes = (picked) => {
    const rewardTiers = [
      { amount: 100, chance: 0.03 },
      { amount: 50, chance: 0.07 },
      { amount: 25, chance: 0.15 },
      { amount: 15, chance: 0.20 },
      { amount: 10, chance: 0.25 },
      { amount: 5, chance: 0.30 },
    ];

    return picked.map((scratcher) => {
      const prizeAmount = getRandomPrize(rewardTiers);
      return { ...scratcher, prizeAmount };
    });
  };

  const getRandomPrize = (rewardTiers) => {
    const random = Math.random();
    console.log(random)
    let cumulativeChance = 0;

    for (const reward of rewardTiers) {
      cumulativeChance += reward.chance;
      console.log(cumulativeChance)
      if (random <= cumulativeChance) {
        console.log("WYGRANBA",reward.amount)
        return reward.amount;
      }
    }

    return 5;
  };

  // Function to check if the player has won
  const checkIfWin = () => {
    const [playerSign, ...rest] = pickedScratchers; // Split the first item (your sign) from the rest
  
    let totalWinAmount = playerSign.prizeAmount; // Start with the prize amount of your sign
  
    let hasMatchingSign = false;
  
    // Iterate over the 3 remaining items
    rest.forEach((scratcher) => {
      if (scratcher.text === playerSign.text) {
        // If one of the scratchers matches your sign, add its prize amount
        totalWinAmount += scratcher.prizeAmount;
        hasMatchingSign = true; // Mark that there's a matching sign
      }
    });
  
    if (hasMatchingSign) {
      setIsWinner(true); // Set win status to true if there's any match
      setWinPrizes([totalWinAmount]); // Set the total win amount
    } else {
      setIsWinner(false); // Mark as not a winner
    }
  };

  return (
    <div className="ScratchersCardWrapper">
      <div className="scratch-options-container">
        <img src={props.image} alt={props.name} />
        <h1 className="cardName">{props.name}</h1>
        <div>
          <label>
            <input
              type="radio"
              value="3"
              amount={props.smallPrice}
              checked={scratchSize === "3"}
              onChange={handleSizeChange}
              disabled={isPlayable} // Zablokowanie opcji zmiany rozmiaru
            />
            Mała {props.smallPrice}$
          </label>
          <label>
            <input
              type="radio"
              value="6"
              amount={props.mediumPrice}
              checked={scratchSize === "6"}
              onChange={handleSizeChange}
              disabled={isPlayable} // Zablokowanie opcji zmiany rozmiaru
            />
            Średnia {props.mediumPrice}$
          </label>
          <label>
            <input
              type="radio"
              value="9"
              amount={props.largePrice}
              checked={scratchSize === "9"}
              onChange={handleSizeChange}
              disabled={isPlayable} // Zablokowanie opcji zmiany rozmiaru
            />
            Duża {props.largePrice}$
          </label>
        </div>
        <label>
        <input type="checkbox"  onChange={fastScratch} disabled={isPlayable}/>
        Szybkie zdrapywanie
        </label>
        <button onClick={playScratch} disabled={isPlayable && !isScratchingComplete}>
          {isScratchingComplete ? "Zagraj ponownie" : "Graj"}
        </button>

        {isScratchingComplete && isWinner && winPrizes.length > 0 && (
          <div className="win-message">
            <h2>Gratulacje! Wygrałeś następującą kwotę:</h2>
            <p>${winPrizes[0]}</p>
          </div>
        )}

        {isScratchingComplete && !isWinner && pickedScratchers.length > 0 && (
          <div className="lose-message">
            <h2>Niestety, nie udało się wygrać. Spróbuj ponownie!</h2>
          </div>
        )}
      </div>
      <div className="scratch-container">
        <div className="scratch-card">
          {pickedScratchers && pickedScratchers.length > 0 ? (
            pickedScratchers.map((scratcher, index) => (
              <div key={index} className="scratcher-item">
                <img
                  src={scratcher.image}
                  alt={scratcher.text}
                  className="scratcher-image"
                />
                <p>{scratcher.text}</p>
                <p>Prize: ${scratcher.prizeAmount}</p>
              </div>
            ))
          ) : (
            <span></span>
          )}
        </div>

        {isCardVisible && (
          <canvas id={`scratch-card-${props.id}`} width="600" height="450" className={fadeOut ? 'fade-out hidden' : 'fade-out'}></canvas>
        )}
      </div>
    </div>
  );
};

export default ScratchersCard;