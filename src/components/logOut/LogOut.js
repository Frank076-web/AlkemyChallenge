import React from 'react';

export default function LogOut() {
    const logOut = () => {
        localStorage.removeItem('token');
    };

    return (
        <a href="/login" className="link-log-out" onClick={logOut}>
            LogOut
        </a>
    );
}
