import React, { useState } from 'react';
import HeroCardShowMoreInfo from './HeroCardShowMoreInfo';
import HeroCardStats from './HeroCardStats';
import { persistLocalStorage } from '../../helpers/persistLocalStorage';

//funcion para renderizar cada heroe del equipo
export default function CardHeroes(props) {
  //Variable de estado para saber si se muestran datos adicionales o no
  const [showMore, setShowMore] = useState(false);

  let showMoreText = 'Show Less';

  //Funcion para mostrar los datos adicionales del heroe
  const showMoreInfo = () => {
    setShowMore(!showMore);
  };

  //Funcion para eliminar el heroe del equipo
  const deleteHero = () => {
    if (
      window.confirm('Are you sure you want to delete this hero?')
    ) {
      let staff = persistLocalStorage('staff', {
        method: 'GET',
        json: true
      });
      let newStaff = staff.filter((hero) => {
        return hero.id !== props.heroe.id;
      });
      console.log(newStaff);
      newStaff.length === 0
        ? persistLocalStorage('staff', {
            method: 'DELETE'
          })
        : persistLocalStorage('staff', {
            data: newStaff
          });
      window.location.reload();
    }
  };

  // console.log(props.heroe);

  let image = props.heroe.image.url,
    name = props.heroe.name;
  return (
    <div
      className="container"
      style={{
        marginTop: '2rem'
      }}
    >
      <div className="card">
        <div className="card-body">
          <img className="card-img-top" src={image} alt={name} />
          <h5 className="card-title text-center">{name}</h5>
          {/* Visualizacion de los stats */}
          <div
            className="card-header text-center"
            style={{
              fontSize: '1.5rem',
              fontWeight: 'bold'
            }}
          >
            Status
          </div>
          <ul className="list-group list-group-flush">
            {<HeroCardStats stats={props.heroe.powerstats} />}
          </ul>

          <div className="container">
            <div
              className="row"
              style={{
                justifyContent: 'center'
              }}
            >
              <button
                className="btn btn-link w-75"
                onClick={showMoreInfo}
              >
                {showMore ? showMoreText : 'Show More'}
              </button>
              {/* Visualizar mas información */}
              {showMore && (
                <HeroCardShowMoreInfo
                  appearance={props.heroe.appearance}
                  biography={props.heroe.biography}
                  work={props.heroe.work}
                />
              )}

              <button
                className="btn btn-dark w-75"
                onClick={deleteHero}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
