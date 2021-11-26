import React, { useEffect, useState } from 'react';
import {
    heroeAlignment,
    heroeAlreadyExist,
    addToStaff,
    isStaffFull
} from './HeroStaffValidation';

export default function HeroCard(props) {
    // console.log(props.heroe);

    //Estado para seleccionar el heroe
    const [heroe, setHeroe] = useState({});
    // const [isAdded, setIsAdded] = useState(false);

    let heroImage = props.heroe.image.url,
        heroName = props.heroe.name;

    //Funcion para evaluar si el heroe ya existe en el staff, caso contrario, evaluar la orientación del heroe y comparar con el staff actual y decidir si agregarlo o no
    useEffect(() => {
        if (!heroe.id) return;

        let staff = JSON.parse(localStorage.getItem('staff'));
        // console.log(staff);
        if (isStaffFull(staff)) return alert('El equipo esta lleno');

        //Evaluamos la existencia del heroe en el staff
        if (heroeAlreadyExist(staff, heroe)) {
            return alert('Este heroe ya pertenece al equipo');
        }

        //Evaluamos la orientación del equipo actual
        const orientation = heroeAlignment(staff);

        //Si la cantidad de miembros del equipo es menor a 6 y la orientacion total aun no supera los tres buenos y tres malos, agregamos el heroe
        addToStaff(staff, heroe, orientation);
    }, [heroe]);

    //Funcion para seleccionar el heroe y posteriormente verificar su existencia en el staff
    const selectHero = () => {
        setHeroe({
            id: props.heroe.id,
            alignment: props.heroe.biography.alignment
        });
    };

    return (
        <>
            <div className="container">
                <div className="card">
                    <div className="card-body">
                        <img
                            className="card-img-top"
                            src={heroImage}
                            alt={heroName}
                        />
                        <h5 className="card-title text-center">
                            {heroName}
                        </h5>
                        <div className="text-center">
                            <button
                                className="btn btn-secondary"
                                onClick={selectHero}
                            >
                                Agregar al equipo
                            </button>
                        </div>
                        {/*                         {isAdded ? (
                            <div className="alert alert-success text-center">
                                Heroe agregado correctamente
                            </div>
                        ) : null} */}
                    </div>
                </div>
            </div>
        </>
    );
}
