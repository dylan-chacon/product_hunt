import React, { useEffect, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { FirebaseContext } from '../../firebase';
import Error404 from '../../components/layout/404';
import Layout from '../../components/layout/Layout';
import Button from '../../components/UI/Button';
import { InputSubmit, Field } from '../../components/UI/Form';

const ContenedorProducto = styled.div`
   @media (min-width:768px) {
        display: grid;
        grid-template-columns: 2fr 1fr;
        column-gap: 2rem;
   }
`;

const Details = () => {
    //states
    const [product, setProduct] = useState({});
    const [error, setError] = useState(false);
    const { comments, createdAt, description, name, company, url, urlImage, votes, creator } = product;

    //router
    const router = useRouter();
    const { query: { id } } = router;

    //useContext
    const { firebase, user } = useContext(FirebaseContext);

    useEffect(() => {
        const getProduct = async () => {
            const product = await firebase.db.collection('products').doc(id).get();
            if (product.exists) {
                setProduct(product.data());
            } else {
                setError(true);
            }
        }
        if (id) getProduct();
    }, [id])

    return (
        <>
            <Layout>
                {error && <Error404 />}

                <div className="contenedor">
                    <h1 css={css`
                        margin-top: 5rem;
                        text-align: center;
                    `}>{name}</h1>
                    <ContenedorProducto>
                        <div>
                            <p>Publicado: {new Date(createdAt).toLocaleString()}</p>
                            <p>Por: {creator && creator.name} de {company}</p>
                            <img src={urlImage} />
                            <p>{description}</p>

                            {user && (
                                <>
                                    <h2>Agrega tu comentario</h2>
                                    <form>
                                        <Field>
                                            <input
                                                type="text"
                                                name="message"
                                            />
                                        </Field>
                                        <InputSubmit type="submit" value="Add comment" />
                                    </form>
                                </>
                            )}
                            <h2 css={css`
                                margin: 2rem 0;
                            `}>Comentarios:</h2>
                            {comments && comments.map((comment) => {
                                <li>
                                    <p>{comment.name}</p>
                                    <p>Escrito por: {comment.userName}</p>
                                </li>
                            })}
                        </div>
                        <aside>
                            <Button
                                target="_blank"
                                bgColor="true"
                                href={url}
                            >Visitar URL</Button>

                            <div css={css`
                                margin-top: 5rem;
                            `}>
                                <p css={css`
                                    text-align: center;
                                `}>{votes} votos</p>
                                {user && (<Button>Votar</Button>)}
                            </div>
                        </aside>
                    </ContenedorProducto>
                </div>
            </Layout>
        </>
    );
}
 
export default Details;