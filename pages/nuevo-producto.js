import React from 'react';
import Router from 'next/router';
import { css } from '@emotion/react';
import Layout from '../components/layout/Layout';
import useValidation from '../hooks/useValidation';
import validateCreateProduct from '../validations/validateCreateProduct';
import { Form, Field, InputSubmit, Error } from '../components/UI/Form';
import firebase from '../firebase';

const INITIAL_STATE = {
    name: '',
    company: '',
    image: '',
    url: '',
    description: '',
};

const NewProduct = () => {
    const [error, setError] = React.useState(false);
    const {
        values, errors, handleChange, handleSubmit, handleBlur,
    } = useValidation(INITIAL_STATE, validateCreateProduct, null);
    const { name, company, image, url, description } = values;

    return (
        <div>
            <Layout>
                <>
                    <h1
                        css={css`
                            text-align: center;
                            margin-top: 5rem;
                        `}
                    >Nuevo Producto</h1>
                    <Form onSubmit={handleSubmit} noValidate>
                        <fieldset>
                            <legend>Información General</legend>
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
                                <label htmlFor="company">Empresa</label>
                                <input
                                    type="text"
                                    id="company"
                                    placeholder="Nombre de empresa"
                                    name="company"
                                    value={company}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Field>
                            {errors.company && <Error>{errors.company}</Error>}
                            <Field>
                                <label htmlFor="image">Imagen</label>
                                <input
                                    type="file"
                                    id="image"
                                    name="image"
                                    value={image}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Field>
                            {errors.image && <Error>{errors.image}</Error>}
                            <Field>
                                <label htmlFor="url">URL</label>
                                <input
                                    type="url"
                                    id="url"
                                    placeholder="URL"
                                    name="url"
                                    value={url}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Field>
                            {errors.url && <Error>{errors.url}</Error>}
                        </fieldset>

                        <fieldset>
                            <legend>Sobre tu producto</legend>
                            <Field>
                                <label htmlFor="description">Descripción</label>
                                <textarea
                                    id="description"
                                    placeholder="Descripción"
                                    name="description"
                                    value={description}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Field>
                            {errors.description && <Error>{errors.description}</Error>}
                        </fieldset>
                        {error && <Error>{error}</Error>}
                        <InputSubmit type="submit" value="Crear Producto" />
                    </Form>
                </>
            </Layout>
        </div>
    );
}
 
export default NewProduct;
