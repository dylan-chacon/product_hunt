import React from 'react';
import { css } from '@emotion/react';
import Layout from '../components/layout/Layout';
import { Form, Field, InputSubmit } from '../components/UI/Form';

const SignIn = () => {
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
                    <Form>
                        <Field>
                            <label htmlFor="name">Nombre</label>
                            <input
                                type="text"
                                id="name"
                                placeholder="Tu nombre"
                                name="name"
                            />
                        </Field>
                        <Field>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Tu email"
                                name="email"
                            />
                        </Field>
                        <Field>
                            <label htmlFor="password">Contraseña</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Contraseña"
                                name="password"
                            />
                        </Field>
                        <InputSubmit type="submit" value="Crear Cuenta" />
                    </Form>
                </>
            </Layout>
        </div>
    );
}
 
export default SignIn;
