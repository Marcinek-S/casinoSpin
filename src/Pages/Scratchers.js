import React, { useState } from "react";
import ScratchersCardSmall from "../Components/UI/ScratchersCard";
import "../style/Scratchers.css";

// Definiowanie tematów z odpowiednimi danymi


const themes = [
    {
      id: 1,
      text: "Bogactwo Jedzenia",
      image: "https://placehold.co/100x100/png", // Zmien ten link na odpowiedni obrazek
      prizes: [
        { id: 1, image: 'https://placehold.co/100x100/png', text: "pizza" },
        { id: 2, image: 'https://placehold.co/100x100/png', text: "burger" },
        { id: 3, image: 'https://placehold.co/100x100/png', text: "fryki" },
        { id: 4, image: 'https://placehold.co/100x100/png', text: "kebab" },
        { id: 5, image: 'https://placehold.co/100x100/png', text: "sushi" },
        { id: 6, image: 'https://placehold.co/100x100/png', text: "kanapka" },
        { id: 7, image: 'https://placehold.co/100x100/png', text: "makaron" },
        { id: 8, image: 'https://placehold.co/100x100/png', text: "kawa" },
        { id: 9, image: 'https://placehold.co/100x100/png', text: "zupa" },
        { id: 10, image: 'https://placehold.co/100x100/png', text: "taco" },
        { id: 11, image: 'https://placehold.co/100x100/png', text: "herbata" },
        { id: 12, image: 'https://placehold.co/100x100/png', text: "pierogi" },
        { id: 13, image: 'https://placehold.co/100x100/png', text: "ciasto" },
        { id: 14, image: 'https://placehold.co/100x100/png', text: "paczek" },
        { id: 15, image: 'https://placehold.co/100x100/png', text: "owoce" },
        { id: 16, image: 'https://placehold.co/100x100/png', text: "warzywa" },
        { id: 17, image: 'https://placehold.co/100x100/png', text: "woda" },
        { id: 18, image: 'https://placehold.co/100x100/png', text: "ryba" },
      ],
    },
    {
      id: 2,
      text: "Diamentowe Zoo",
      image: "https://placehold.co/100x100/png", // Zmien ten link na odpowiedni obrazek
      prizes: [
        { id: 1, image: 'https://placehold.co/100x100/png', text: "pies" },
        { id: 2, image: 'https://placehold.co/100x100/png', text: "kot" },
        { id: 3, image: 'https://placehold.co/100x100/png', text: "zebra" },
        { id: 4, image: 'https://placehold.co/100x100/png', text: "słoń" },
        { id: 5, image: 'https://placehold.co/100x100/png', text: "tygrys" },
      ],
    },
    {
      id: 3,
      text: "Auto Mania",
      image: "https://placehold.co/100x100/png", // Zmien ten link na odpowiedni obrazek
      prizes: [
        { id: 1, image: 'https://placehold.co/100x100/png', text: "samochód" },
        { id: 2, image: 'https://placehold.co/100x100/png', text: "motor" },
        { id: 3, image: 'https://placehold.co/100x100/png', text: "rower" },
        { id: 4, image: 'https://placehold.co/100x100/png', text: "ciężarówka" },
        { id: 5, image: 'https://placehold.co/100x100/png', text: "autobus" },
        { id: 6, image: 'https://placehold.co/100x100/png', text: "tramwaj" },
        { id: 7, image: 'https://placehold.co/100x100/png', text: "hulajnoga" },
        { id: 8, image: 'https://placehold.co/100x100/png', text: "rolki" },
      ],
    },
    {
      id: 4,
      text: "Zakupowe Szaleństwo",
      image: "https://placehold.co/100x100/png", // Zmien ten link na odpowiedni obrazek
      prizes: [
        { id: 1, image: 'https://placehold.co/100x100/png', text: "spodnie" },
        { id: 2, image: 'https://placehold.co/100x100/png', text: "czapka" },
        { id: 3, image: 'https://placehold.co/100x100/png', text: "rekawiczki" },
        { id: 4, image: 'https://placehold.co/100x100/png', text: "bluzka" },
        { id: 5, image: 'https://placehold.co/100x100/png', text: "skarpetki" },
      ],
    },
  ];

const Scratchers = () => {
  const [selectedTheme, setSelectedTheme] = useState(themes[0]); // Ustaw domyślny temat
  const [prizes, setPrizes] = useState(selectedTheme.prizes); // Ustaw nagrody dla domyślnego tematu
  const [isGameActive, setIsGameActive] = useState(false); // Nowy stan dla śledzenia, czy gra się rozpoczęła

  const handleThemeChange = (theme) => {
    // Sprawdzanie, czy gra jest aktywna, jeśli tak, zablokuj zmianę tematu
    if (!isGameActive) {
      setSelectedTheme(theme);
      setPrizes(theme.prizes); // Zmien nagrody w zależności od wybranego tematu
    }
  };

  return (
    <div className="ScratchersWrapper">
      <div className="scratchersPickTheme">
        <ul>
          {themes.map((theme) => (
            <li key={theme.id} onClick={() => handleThemeChange(theme)}>
              <div>
                <img src={theme.image} alt={theme.text} />
                <h1>{theme.text}</h1>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="scratchersCard">
        <ScratchersCardSmall
          name={selectedTheme.text}
          image={selectedTheme.image}
          id="1"
          prize={prizes} // Używaj zmiennej prizes
          smallPrice="10"
          mediumPrice="15"
          largePrice="25"
          setIsGameActive={setIsGameActive} // Przekaż funkcję do aktualizacji stanu gry
        />
      </div>
    </div>
  );
};

export default Scratchers;
