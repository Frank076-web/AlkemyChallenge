import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

export default function Login() {
    //Una vez logueado, si el usuario intenta volver a la pagina de login, se redirecciona a la pagina principal
    useEffect(() => {
        if (localStorage.getItem('token')) {
            alert('Atención ya estás logueado, redirigiendo al home');
            window.location.href = '/';
        }
    }, []);

    const [values, setValues] = useState();
    const [isTryingToLogin, setIsTryingToLogin] = useState(false);

    //Manejo de formulario y errores con formik y yup
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email')
                .required('The field is required'),
            password: Yup.string().required('The field is required')
        }),

        //Al hacer submit, se guardan los datos del formulario en el state
        onSubmit: (values) => {
            // console.log(values);
            setValues(values);
            setIsTryingToLogin(true);
            setTimeout(() => {
                setIsTryingToLogin(false);
            }, 100);
        }
    });
    // console.log(values);

    //Envio de datos si el usuario esta intentando hacer submit
    //Enviar datos al servidor para validar usuario, si es correcto, se guarda el token en el localStorage y se redirecciona a la pagina principal
    useEffect(() => {
        const getToken = async () => {
            try {
                if (values && isTryingToLogin) {
                    const response = await axios.post(
                        'http://challenge-react.alkemy.org/',
                        values
                    );
                    console.log(response);
                    if (response.data.token) {
                        localStorage.setItem(
                            'token',
                            response.data.token
                        );
                        //cookie de sesión que expira en cuanto se cierre el navegador para eleminar el token y no poder acceder a la pagina principal sin volver a loguearse
                        document.cookie =
                            'isLoggedIn=' +
                            encodeURIComponent(true) +
                            ';' +
                            'expires=0';
                        window.location.href = '/';
                    }
                }
            } catch (error) {
                alert('Error: incorrect username and / or password');
            }
        };
        getToken();
    }, [values, isTryingToLogin]);

    return (
        <>
            <h3
                className="text-center text-white pt-5"
                style={{
                    fontSize: '4rem'
                }}
            >
                Login
            </h3>
            <div className="container">
                <div className="row justify-content-center align-items-center">
                    <div className="col-md-6">
                        <div id="login-box" className="col-md-12">
                            <form
                                className="form"
                                onSubmit={formik.handleSubmit}
                            >
                                <div className="form-group">
                                    <label
                                        htmlFor="username"
                                        className="text-white"
                                    >
                                        Username:
                                    </label>
                                    <br />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        onChange={formik.handleChange}
                                        value={formik.values.email}
                                        className="form-control"
                                    />
                                    {formik.errors.email ? (
                                        <div className="alert alert-danger">
                                            {formik.errors.email}
                                        </div>
                                    ) : null}
                                </div>
                                <div className="form-group">
                                    <label
                                        htmlFor="password"
                                        className="text-white"
                                    >
                                        Password:
                                    </label>
                                    <br />
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Enter your password"
                                        onChange={formik.handleChange}
                                        value={formik.values.password}
                                        className="form-control"
                                    />
                                    {formik.errors.password ? (
                                        <div className="alert alert-danger">
                                            {formik.errors.password}
                                        </div>
                                    ) : null}
                                </div>
                                <div className="form-group">
                                    {/*                                     <label
                                        for="remember-me"
                                        class="text-info"
                                    >
                                        <span>Remember me</span> 
                                        <span>
                                            <input
                                                id="remember-me"
                                                name="remember-me"
                                                type="checkbox"
                                            />
                                        </span>
                                    </label> */}
                                    <br />
                                    <div className="text-center">
                                        <input
                                            type="submit"
                                            name="submit"
                                            className="btn btn-info btn-md"
                                            value="Send"
                                            style={{
                                                width: '50%'
                                            }}
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
