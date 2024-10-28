import React, {useState} from "react";
import SimpleRoulette from "../Components/UI/SimpleRoulette";


import casinoChip from "../images/casino_chip.jpg"

const hourRoulettePrizes = [
  { id: 1, image: casinoChip, text: '10$', chance: [0.0, 0.50] },
  { id: 2, image: 'https://placehold.co/100x100/png', text: '25$', chance: [0.50, 0.70] },
  { id: 3, image: 'https://placehold.co/100x100/png', text: '50$', chance: [0.70, 0.85] },
  { id: 4, image: 'https://placehold.co/100x100/png', text: '75$', chance: [0.85, 0.95] },
  { id: 5, image: 'https://placehold.co/100x100/png', text: '100$', chance: [0.95, 1.0] }
];
const dailyRoulettePrizes = [
  { id: 1, image: 'https://placehold.co/100x100/png', text: '200$', chance: [0.0, 0.50] },
  { id: 2, image: 'https://placehold.co/100x100/png', text: '400$', chance: [0.50, 0.70] },
  { id: 3, image: 'https://placehold.co/100x100/png', text: '600$', chance: [0.70, 0.85] },
  { id: 4, image: 'https://placehold.co/100x100/png', text: '800$', chance: [0.85, 0.95] },
  { id: 5, image: 'https://placehold.co/100x100/png', text: '1000$', chance: [0.95, 1.0] }
];
const weeklyRoulettePrizes = [
  { id: 1, image: 'https://placehold.co/100x100/png', text: '1000$', chance: [0.0, 0.50] },
  { id: 2, image: 'https://placehold.co/100x100/png', text: '2500$', chance: [0.50, 0.70] },
  { id: 3, image: 'https://placehold.co/100x100/png', text: '5000$', chance: [0.70, 0.85] },
  { id: 4, image: 'https://placehold.co/100x100/png', text: '7500$', chance: [0.85, 0.95] },
  { id: 5, image: 'https://placehold.co/100x100/png', text: '10000$', chance: [0.95, 1.0] }
];

const Balance = (props) => {

  return (
    <div className="balanceWrapper">
      {/* hour Roulette */}
      <h1>Zakreć co godzine</h1>
      
      <SimpleRoulette prizes={hourRoulettePrizes}/>
      {/* daily Roulette */}
      <h1>Zakreć co dzień</h1>
      <SimpleRoulette prizes={dailyRoulettePrizes}/>
      {/* weekly Roulette */}
      <h1>Zakreć co tydzien</h1>
      <SimpleRoulette prizes={weeklyRoulettePrizes} />
    </div>
  );
};

export default Balance;
