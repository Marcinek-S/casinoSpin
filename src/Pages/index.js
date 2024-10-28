import React, {useState} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import NavBar from "../Components/UI/NavBar";
import Home from "./Home";
import Balance from "./Balance";
import Roulette from "./Roulette";
import Crash from "./Crash";
import Mines from "./Mines";
import Scratchers from "./Scratchers";
import BalckJack from "./BlackJack"
import Profile from "./Profile";

const Pages = () => {
const [accAmount, setAccAmount] = useState(200)
  return (
    <Router>
      <NavBar accAmount={accAmount} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/balance" element={<Balance />} />
        <Route path="/roulette" element={<Roulette />} />
        <Route path="/crash" element={<Crash />} />
        <Route path="/mines" element={<Mines />} />
        <Route path="/scratchers" element={<Scratchers />} />
        <Route path="/blackjack" element={<BalckJack />} />
        <Route path="/profile" element={<Profile />} />
        
      </Routes>
    </Router>
  );
};

export default Pages;