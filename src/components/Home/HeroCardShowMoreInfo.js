import React from 'react';

export default function HeroCardShowMoreInfo(props) {
    const { appearance, biography, work } = props;

    let weight = appearance.weight[1],
        height = appearance.height[1],
        name = biography['full-name'],
        alias = biography.aliases.join(', '),
        eyeColor = appearance['eye-color'],
        hairColor = appearance['hair-color'],
        workPlace = work.base;

    // console.log(biography);

    return (
        <>
            <div
                className="card-header text-center"
                style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold'
                }}
            >
                Features
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">Weight: {weight}</li>
                <li className="list-group-item">Height: {height}</li>
                <li className="list-group-item">Name: {name}</li>
                <li className="list-group-item">Alias: {alias}</li>
                <li className="list-group-item">
                    Eye color: {eyeColor}
                </li>
                <li className="list-group-item">
                    Hair Color: {hairColor}
                </li>
                <li className="list-group-item">
                    Workplace: {workPlace}
                </li>
            </ul>
        </>
    );
}
