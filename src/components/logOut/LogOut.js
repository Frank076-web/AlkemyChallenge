import React from 'react';
import { Link } from 'react-router-dom';

export default function LogOut() {
	const logOut = () => {
		localStorage.removeItem('token');
	};

	return (
		<Link to="/login" className="link-log-out" onClick={logOut}>
			LogOut
		</Link>
	);
}
