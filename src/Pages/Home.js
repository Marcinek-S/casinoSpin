import React from "react";
import GameCard from "../Components/UI/GameCard";

import "../style/Home.css"



const Home = () => {
  return (
  <div className="homePage">
    <div className="gameListWrapper">
          <GameCard gameName="ruletka" game="roulette"/>
          <GameCard gameName="black jack" game="blackjack"/>
          <GameCard gameName="crash" game="crash"/>
          <GameCard gameName="bomby" game="mines"/>
          <GameCard gameName="zdrapki" game="scratchers"/>
          
    </div>
    
  </div>)
};

export default Home;
