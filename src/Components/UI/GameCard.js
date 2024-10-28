import React from "react";
import {NavLink} from "react-router-dom"

import "../../style/GameCard.css"


const GameCard = (props) => {
    return (
    <NavLink to={props.game} className="cardWrapper">
        <div className="gameCard">
            <img src="https://placehold.co/200x250/png" alt=""/>
            <h1 className="gameName">{props.gameName}</h1>
        </div>
    </NavLink>
    )
}

export default GameCard;