import React, { useContext } from 'react';
import Router, { useRouter } from 'next/router';
import { css } from '@emotion/react';
import FileUploader from 'react-firebase-file-uploader';
import Layout from '../components/layout/Layout';
import useValidation from '../hooks/useValidation';
import validateCreateProduct from '../validations/validateCreateProduct';
import { Form, Field, InputSubmit, Error } from '../components/UI/Form';
import { FirebaseContext } from '../firebase';

const INITIAL_STATE = {
    name: '',
    company: '',
    image: '',
    url: '',
    description: '',
};

const NewProduct = () => {
    const [error, setError] = React.useState(false);
    const [upload, setUpload] = React.useState(false);
    const [progress, setProgress] = React.useState(0);
    const [urlImage, setUrl] = React.useState('');
    const [nameImage, setImageName] = React.useState('');
    const { user, firebase } = React.useContext(FirebaseContext);
    const router = useRouter();

    const {
        values, errors, handleChange, handleSubmit, handleBlur,
    } = useValidation(INITIAL_STATE, validateCreateProduct, createProduct);
    const { name, company, image, url, description } = values;

    async function createProduct() {
        if (!user) return router.push('/login');

        // objeto nuevo producto
        const product = {
            name,
            company,
            url,
            urlImage,
            description,
            votes: 0,
            comments: [],
            createdAt: Date.now(),
        };

        // firestore
        await firebase.db.collection('products').add(product);

        return router.push('/')
    };

    const handleUploadStart = () => {
        setProgress(0);
        setUpload(true);
    };

    const handleProgress = (progress) => setProgress({progress});

    const handleUploadError = (error) => {
        setUpload(error);
        setError(error);
        console.log(error);
    };

    const handleUploadSuccess = (name) => {
        setProgress(100);
        setUpload(false);
        setImageName(name);
        firebase.storage.ref("products").child(name).getDownloadURL()
            .then((url) => setUrl(url));
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
                                <FileUploader
                                    accept="image/*"
                                    randomizeFilename
                                    id="image"
                                    name="image"
                                    storageRef={firebase.storage.ref("products")}
                                    onUploadStart={handleUploadStart}
                                    onUploadError={handleUploadError}
                                    onUploadSuccess={handleUploadSuccess}
                                    onProgress={handleProgress}
                                />
                            </Field>
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
