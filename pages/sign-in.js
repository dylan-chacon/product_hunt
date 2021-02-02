import React from 'react';
import { css } from '@emotion/react';
import Layout from '../components/layout/Layout';
import useValidation from '../hooks/useValidation';
import validateSingIn from '../validations/validateSingIn';
import { Form, Field, InputSubmit, Error } from '../components/UI/Form';

const INITIAL_STATE = {
    name: '',
    email: '',
    password: '',
}
const SignIn = () => {
    const {
        values, errors, handleChange, handleSubmit, handleBlur,
    } = useValidation(INITIAL_STATE, validateSingIn, crearCuenta);
    const { name, email, password } = values;
    
    function crearCuenta() {
        console.log('aaa')
    }
    return (
        <div>
            <Layout>
                <>
                    <h1
                        css={css`
                            text-align: center;
                            margin-top: 5rem;
                        `}
                    >Crear Cuenta</h1>
                    <Form onSubmit={handleSubmit} noValidate>
                        <Field>
                            <label htmlFor="name">Nombre</label>
                            <input
                                type="text"
                                id="name"
                                placeholder="Tu nombre"
                                name="name"
                                value={name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </Field>
                        {errors.name && <Error>{errors.name}</Error>}
                        <Field>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Tu email"
                                name="email"
                                value={email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </Field>
                        {errors.email && <Error>{errors.email}</Error>}
                        <Field>
                            <label htmlFor="password">Contraseña</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Contraseña"
                                name="password"
                                value={password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </Field>
                        {errors.password && <Error>{errors.password}</Error>}
                        <InputSubmit type="submit" value="Crear Cuenta" />
                    </Form>
                </>
            </Layout>
        </div>
    );
}
 
export default SignIn;
