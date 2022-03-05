import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HeroCard from './HeroCard';
import './Home.css';
import LogOut from '../logOut/LogOut';
import '../logOut/LogOut.css';
import { Link } from 'react-router-dom';

export default function Home() {
	const [heroId, setHeroId] = useState([]);
	const [heroes, setHeroes] = useState([]);

	const [bigState, setBigState] = useState({});
	const [totalStates, setTotalStates] = useState({});

	const [averageHeightWidth, setAverageHeightWidth] = useState({});

	// const navigate = useNavigate();
	// useEffect(() => {
	// 	if (
	// 		!localStorage.getItem('token') &&
	// 		window.location.pathname !== '/login'
	// 	) {
	// 		alert('Please, login before you continue');
	// 		navigate('/login');
	// 	}
	// }, [navigate]);

	//Traer los datos del localStorage y agregarlos a la variable de estado heroes
	useEffect(() => {
		const staff = JSON.parse(localStorage.getItem('staff'));
		if (staff) {
			staff.forEach(hero => {
				setHeroId(heroes => [...heroes, hero.id]);
			});
		}
	}, []);

	//Tomar los datos ID de los heroes del equipo y hacer la petición a la API para traer los datos
	useEffect(() => {
		// console.log(heroId);
		const getStaff = () => {
			heroId.forEach(async id => {
				const response = await axios.get(
					`https://www.superheroapi.com/api.php/10221283496530128/${id}`
				);
				setHeroes(heroes => [...heroes, response.data]);
			});
		};
		getStaff();
	}, [heroId]);

	//Función para evaluar los acumulativos de stats
	useEffect(() => {
		if (heroes.length < heroId.length) return;
		const totalStats = {};
		const totalWeightAndHeight = {
			height: 0,
			weight: 0
		};
		//Guardamos en estas variables el status mas alto
		let bigger = 0,
			biggerType = '';
		//Tomamos todos los stats y los sumamos
		heroes.forEach(hero => {
			for (let key in hero.powerstats) {
				if (!totalStats[key]) {
					totalStats[key] = parseInt(hero.powerstats[key]);
				} else {
					totalStats[key] += parseInt(hero.powerstats[key]);
				}
			}
		});
		//Agregamos los stats totales a la variable de estado
		setTotalStates(totalStats);

		//Evaluamos cual es el mayor y lo guardamos en la variable bigger y biggerType
		for (let key in totalStats) {
			if (totalStats[key] > bigger) {
				bigger = totalStats[key];
				biggerType = key[0].toUpperCase() + key.slice(1);
			}
		}
		//Guardamos el mayor en el estado
		setBigState({
			biggerType,
			bigger
		});

		//Calculamos el promedio de altura y anchura
		heroes.forEach(hero => {
			totalWeightAndHeight['height'] += parseInt(
				hero.appearance.height[1]
			);
			totalWeightAndHeight['weight'] += parseInt(
				hero.appearance.weight[1]
			);
		});

		setAverageHeightWidth({
			height: totalWeightAndHeight['height'] / heroes.length,
			weight: totalWeightAndHeight['weight'] / heroes.length
		});
	}, [heroes, heroId]);

	return (
		<>
			<div className="box-status-total">
				<h1 className="team-title">SuperHeroes Team</h1>
				<Link to="/search" className="link-search-hero">
					Search
				</Link>
				<LogOut />
			</div>
			<div
				className="container"
				style={{
					marginTop: '2rem'
				}}
			>
				<div className="row">
					{heroes
						? heroes.map(heroe => {
								return (
									<div className="col-sm-6">
										<HeroCard heroe={heroe} key={heroe.id} />
									</div>
								);
						  })
						: null}
				</div>
			</div>
			{/* Stats Totales */}
			<ol
				className="list-group w-75"
				style={{
					marginTop: '2rem',
					marginLeft: 'auto',
					marginRight: 'auto'
				}}
			>
				<li
					className="list-group-item list-group-item-dark"
					style={{
						fontSize: '1.5rem',
						textAlign: 'center'
					}}
				>
					Category Team: {bigState.biggerType}
				</li>
				{/* Renderizamos la lista con los acumulativos del estado */}
				{Object.keys(totalStates).map((key, index) => {
					return (
						<li className="list-group-item text-center" key={index}>
							{'Total '}
							{key[0].toUpperCase() + key.slice(1)}:{' '}
							{totalStates[key]}
						</li>
					);
				})}
				{/* Renderizamos la lista con el promedio de altura y anchura */}
				<li className="list-group-item text-center">
					Average Height: {averageHeightWidth.height} cm
				</li>
				<li className="list-group-item text-center">
					Average Weight: {averageHeightWidth.weight} Kg
				</li>
			</ol>
		</>
	);
}
