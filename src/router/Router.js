import React, { useEffect } from 'react';
import {
	HashRouter as Router,
	Routes,
	Route
} from 'react-router-dom';
import Home from '../components/Home/Home';
import SearchHero from '../components/Search/Search';
import Login from '../components/login/Login';
import readCookie from '../helpers/readCookie';
import '../assets/29571-marvel.jpg';
import './Router.css';

export default function RouterApp() {
	//Funcion para evaluar si el usuario esta logueado, caso contrario redirecciona a la pagina de login
	useEffect(() => {
		// console.log(readCookie('isLoggedIn'));
		if (readCookie('isLoggedIn') !== 'true') {
			localStorage.removeItem('token');
		}
	}, []);

	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/search" element={<SearchHero />} />
				<Route path="/login" element={<Login />} />
			</Routes>
		</Router>
	);
}
