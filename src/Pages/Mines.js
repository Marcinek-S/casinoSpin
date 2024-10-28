import React, { useState } from 'react';
import "../style/Mines.css"

const MinesCasinoComponent = () => {
  const [MinesCount, setMinesCount] = useState(4); // Ilość min
  const [minesBoard, setMinesBoard] = useState(Array(25).fill(null)); // Plansza 5x5
  const [revealed, setRevealed] = useState(Array(25).fill(false)); // Odkryte pola
  const [bet, setBet] = useState(1); // Zakład gracza
  const [potentialWin, setPotentialWin] = useState(0); // Potencjalna wygrana
  const [gameOver, setGameOver] = useState(false); // Czy gra się zakończyła
  const [gameStarted, setGameStarted] = useState(false); // Czy gra została rozpoczęta

  // Funkcja do rozpoczęcia gry i umieszczenia min
  const placeMines = () => {
    if (bet <= 0) {
      alert("Musisz postawić zakład, aby rozpocząć grę!");
      return;
    }

    setGameOver(false);
    setGameStarted(true); // Gra jest aktywna
    setPotentialWin(0); // Reset potencjalnej wygranej
    setRevealed(Array(25).fill(false)); // Reset planszy odkrytych pól

    let newMinesBoard = Array(25).fill(null);
    let bombsIndex = new Set();

    // Losowe rozmieszczenie min
    while (bombsIndex.size < MinesCount) {
      let randomIndex = Math.floor(Math.random() * 25);
      bombsIndex.add(randomIndex);
    }

    bombsIndex.forEach(index => {
      newMinesBoard[index] = "x"; // Umieść minę
    });

    setMinesBoard(newMinesBoard);
  };

  // Funkcja do obsługi zmiany liczby min
  const handleMinesCountChange = (event) => {
    setMinesCount(parseInt(event.target.value));
  };

  // Funkcja obliczająca mnożnik na podstawie liczby min
  const calculateMultiplier = () => {
    return 25 / (25 - MinesCount); // Proporcja oparta na liczbie min
  };

  // Funkcja do sprawdzenia, czy gracz odkrył bombę
  const checkIfBomb = (index) => {
    if (!gameStarted || gameOver || revealed[index]) return; // Jeśli gra nie zaczęła się, lub się zakończyła, lub pole już odkryte, nic nie rób

    let updatedRevealed = [...revealed];
    updatedRevealed[index] = true;
    setRevealed(updatedRevealed);

    if (minesBoard[index] === "x") {
      alert("Bomba! Przegrywasz!");
      setGameOver(true);
      setGameStarted(false); // Koniec gry
    } else {
      // Zwiększenie potencjalnej wygranej
      const multiplier = calculateMultiplier();
      setPotentialWin(prevWin => prevWin + bet * multiplier); // Mnożnik zależy od ilości min
    }
  };

  // Funkcja obsługująca cashout
  const handleCashout = () => {
    if (!gameStarted) return; // Cashout tylko jeśli gra się rozpoczęła
    alert(`Gratulacje! Wypłacasz: ${potentialWin.toFixed(2)}`);
    resetGame();
  };

  // Funkcja resetująca grę
  const resetGame = () => {
    setBet(1);
    setPotentialWin(0);
    setGameOver(false);
    setGameStarted(false); // Zresetowanie flagi aktywności gry
    setMinesBoard(Array(25).fill(null));
    setRevealed(Array(25).fill(false));
  };

  return (
    <div className="minesWrapper">
      <div className='minesPanel'>
        <h3>Wybierz ilość bomb</h3>
        <div>
          <label>
            <input
              type="radio"
              value="4"
              checked={MinesCount === 4}
              onChange={handleMinesCountChange}
            />
            4
          </label>
          <label>
            <input
              type="radio"
              value="8"
              checked={MinesCount === 8}
              onChange={handleMinesCountChange}
            />
            8
          </label>
          <label>
            <input
              type="radio"
              value="16"
              checked={MinesCount === 16}
              onChange={handleMinesCountChange}
            />
            16
          </label>
          <label>
            <input
              type="radio"
              value="24"
              checked={MinesCount === 24}
              onChange={handleMinesCountChange}
            />
            24
          </label>
        </div>
        
        <p>Ilość bomb: {MinesCount}</p>
        <input
          type="number"
          value={bet}
          onChange={(e) => setBet(Number(e.target.value))}
          placeholder="Wpisz zakład"
          min="1"
        />
        <button onClick={placeMines}>Start</button>
        <button onClick={handleCashout} disabled={!gameStarted || potentialWin === 0 || gameOver}>
          Cashout
        </button>
        <p>Potencjalna wygrana: {potentialWin.toFixed(2)}</p>
      </div>

      <div className='minesBoardWrapper'>
        {minesBoard.map((cell, index) => (
          <div 
            className={`mineCard ${revealed[index] ? 'revealed' : ''}`}
            key={index}
            onClick={() => checkIfBomb(index)}
          >
            {revealed[index] && (cell === "x" ? "💣" : "✅")}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MinesCasinoComponent;
