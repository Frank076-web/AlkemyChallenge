import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import HeroCard from './HeroCard';
import './Search.css';
import LogOut from '../logOut/LogOut';
import '../logOut/LogOut.css';
import { Link, useNavigate } from 'react-router-dom';

export default function SearchHero() {
	//Manejo del formulario
	const [valuesForm, setValuesForm] = useState();
	const [heroes, setHeroes] = useState();

	const navigate = useNavigate();
	useEffect(() => {
		if (
			!localStorage.getItem('token') &&
			window.location.pathname !== '/login'
		) {
			alert('Please, login before you continue');
			navigate('/login');
		}
	}, [navigate]);

	const formik = useFormik({
		initialValues: {
			hero: ''
		},
		validationSchema: Yup.object({
			hero: Yup.string().required(
				'Por favor ingrese un nombre válido para continuar'
			)
		}),

		onSubmit: values => {
			setValuesForm(values);
		}
	});

	//Petición busqueda de heroes
	useEffect(() => {
		const getHeroe = async () => {
			try {
				const response = await axios.get(
					`https://www.superheroapi.com/api.php/10221283496530128/search/${valuesForm.hero}`
				);
				setHeroes(response.data.results);
			} catch (error) {
				console.log(error);
			}
		};
		getHeroe();
	}, [valuesForm]);

	//Formulario de busqueda
	return (
		<>
			<div>
				<h1
					className="text-center"
					style={{
						fontSize: '3rem',
						backgroundColor: '#ffffff90',
						color: '#000',
						padding: '2rem'
					}}
				>
					Search new hero to add in your team
				</h1>
				<Link to="/" className="link-home">
					Return Home
				</Link>
				<LogOut />
			</div>
			<form className="form" onSubmit={formik.handleSubmit}>
				<div className="container">
					<div className="row">
						<input
							className="form-control"
							type="text"
							placeholder="Insert the name of hero"
							name="hero"
							onChange={formik.handleChange}
							value={formik.values.hero}
						/>
						{formik.errors.hero ? (
							<div className="alert alert-danger">
								{formik.errors.hero}
							</div>
						) : null}
						<div className="text-center">
							<input
								type="submit"
								className="btn btn-primary w-50 justify-content-center"
								value="Search"
								style={{
									marginTop: '.5rem'
								}}
							></input>
						</div>
					</div>
				</div>
			</form>

			{/* Listado de Heroes buscados  */}
			<div
				className="row"
				style={{
					marginTop: '2rem'
				}}
			>
				{heroes !== undefined
					? heroes.map(heroe => {
							return (
								<div className="col-sm-4">
									<HeroCard heroe={heroe} key={heroe.id} />
								</div>
							);
					  })
					: null}
			</div>
		</>
	);
}
