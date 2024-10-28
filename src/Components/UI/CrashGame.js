import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

const CrashGame = () => {
  const [multiplier, setMultiplier] = useState(1);
  const [isCrashed, setIsCrashed] = useState(false);
  const [dataPoints, setDataPoints] = useState([1]);
  const [bet, setBet] = useState(1); // Zakład
  const [gameStarted, setGameStarted] = useState(false); // Czy gra się rozpoczęła
  const [cashOutMultiplier, setCashOutMultiplier] = useState(null); // Mnożnik przy wypłacie
  const [payout, setPayout] = useState(0); // Wypłacona nagroda

  // Funkcja do rozpoczęcia gry
  const startGame = () => {
    setGameStarted(true);
    setMultiplier(1);
    setIsCrashed(false);
    setDataPoints([1]); // Resetuj punkty danych
    setPayout(0); // Reset wygranej
  };

  // Funkcja do restartu gry
  const resetGame = () => {
    setGameStarted(false); // Gra może być uruchomiona ponownie
    setMultiplier(1); // Resetuje mnożnik
    setIsCrashed(false); // Reset crasha
    setDataPoints([1]); // Resetuje punkty danych
    setPayout(0); // Reset wygranej
    setCashOutMultiplier(false)
  };

  useEffect(() => {
    let interval;
    if (gameStarted && !isCrashed) {
      const crashAt = Math.random() * (2 - 1) + 1; // Losowy crash
      console.log(crashAt)
      interval = setInterval(() => {
        setMultiplier(prev => {
          const newMultiplier = prev + 0.01;
          // Zastępuj datę wykresu tylko dwoma punktami: początkowy i aktualny
          setDataPoints([1, newMultiplier]);

          if (newMultiplier >= crashAt) {
            setIsCrashed(true);
            clearInterval(interval);
          }
          return newMultiplier;
        });
      }, 100);
    }

    return () => clearInterval(interval);
  }, [gameStarted, isCrashed]);

  // Dane do wykresu
  const chartData = {
    labels: Array.from({ length: dataPoints.length }, (_, i) => i), // Oś X
    datasets: [
      {
        label: 'Multiplier',
        data: dataPoints,
        fill: true,
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.6, // Lekko paraboliczny kształt
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { grid: { display: false } },
      y: {
        grid: { display: false },
        beginAtZero: false, // Wyłączanie startu od zera
        min: 1, // Minimalna wartość osi Y to 1
      },
    },
    elements: {
      line: {
        borderWidth: 3,

      },
      point: {
        radius: 0, // Brak punktów na wykresie
      },
    },
  };

  // Funkcja do wpisania zakładu
  const handleBetChange = (e) => {
    setBet(e.target.value);
  };


  // Funkcja do wypłaty (cash out)
  const handleCashOut = () => {
    if (!cashOutMultiplier && gameStarted && !isCrashed) {
      setCashOutMultiplier(multiplier); // Ustaw mnożnik przy wypłacie
      setPayout(bet * multiplier); // Oblicz wypłatę
    }
  };

  return (
    <div style={{ width: '800px', height: '400px', margin: '0 auto' }}>
      <h1>Multiplier: {multiplier.toFixed(2)}x</h1>
      <span>Potencjalna wygrana: {(bet * multiplier).toFixed(2)}$</span>

      {/* Formularz do wpisania zakładu */}
      <div>
        <label>Enter your bet:</label>
        <input
          type="number"
          value={bet}
          onChange={handleBetChange}
          min="1"
          disabled={gameStarted}
        />
      </div>
      {/* Przycisk do rozpoczęcia gry */}
      {!gameStarted || isCrashed ? (
        <button onClick={gameStarted ? resetGame : startGame}>
          {gameStarted && isCrashed ? 'Play Again' : 'Start Game'}
        </button>
      ) : (
        <button disabled>Game in Progress...</button>
      )}

      {/* Wyświetlanie wykresu */}
      <Line data={chartData} options={chartOptions} />

      {/* Przycisk wypłaty */}
      <button onClick={handleCashOut} disabled={!!cashOutMultiplier || isCrashed || !gameStarted}>
        Cash Out
      </button>

      {/* Wyświetlanie nagrody po wypłacie */}
      {cashOutMultiplier && (
        <div>
          <h2>Cash Out at {cashOutMultiplier.toFixed(2)}x</h2>
          <h3>Payout: ${payout.toFixed(2)}</h3>
        </div>
      )}
    </div>
  );
};

export default CrashGame;
