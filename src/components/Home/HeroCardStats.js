import React from 'react';

//Funcion que se encarga de renderizar los status de los personajes
export default function HeroCardStats(props) {
    let stats = props.stats,
        combat = stats.combat,
        durability = stats.durability,
        intelligence = stats.intelligence,
        power = stats.power,
        speed = stats.speed,
        strength = stats.strength;
    return (
        <>
            <li className="list-group-item">Combat: {combat}</li>
            <li className="list-group-item">
                Durability: {durability}
            </li>
            <li className="list-group-item">
                Intelligence: {intelligence}
            </li>
            <li className="list-group-item">Power: {power}</li>
            <li className="list-group-item">Speed: {speed}</li>
            <li className="list-group-item">Strenght: {strength}</li>
        </>
    );
}
