import React, { useEffect, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { FirebaseContext } from '../../firebase';
import Error404 from '../../components/layout/404';
import Layout from '../../components/layout/Layout';
import Button, { Buttons } from '../../components/UI/Button';
import { InputSubmit, Field } from '../../components/UI/Form';

const ContenedorProducto = styled.div`
   @media (min-width:768px) {
        display: grid;
        grid-template-columns: 2fr 1fr;
        column-gap: 2rem;
   }
`;

const Creator = styled.p`
    padding: .5rem 2rem;
    background-color: #DA552F;
    color: #fff;
    text-transform: uppercase;
    font-weight: bold;
    display: inline-block;
    text-align: center;
`;

const Details = () => {
    //states
    const [product, setProduct] = useState({});
    const [error, setError] = useState(false);
    const [comment, setComment] = useState({});
    const { comments, createdAt, description, name, company, url, urlImage, votes, creator, voted } = product;

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
    }, [id]);
    const vote = () => {
        if (!user) return router.push('login');
        
        const newVotes = votes + 1;
        //validar voto
        if (voted.includes(user.uid)) return;
        // actualizar db 
        firebase.db.collection('products').doc(id).update({
            votes: newVotes,
            voted: [...voted, user.uid],
        });
        // atualizar state
        setProduct({ ...product, votes: newVotes, voted: [...voted, user.uid], });
    };
    const handleComment = e => setComment({ ...comment, [e.target.name]: e.target.value });
    const addComment = (e) => {
        e.preventDefault();

        if (!user) return router.push('login');
        // extra info
        comment.userID = user.uid;
        comment.userName = user.displayName;
        // db
        firebase.db.collection('products').doc(id).update({
            comments: [...product.comments, comment]
        })
        // state
        setProduct({ ...product, comments: [...product.comments, comment]});
    };
    const isCreator = (id) => {
        if (creator.id === id) return true;
    };

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
                                    <form onSubmit={() => addComment()}>
                                        <Field>
                                            <input
                                                type="text"
                                                name="message"
                                                onChange={handleComment}
                                            />
                                        </Field>
                                        <InputSubmit type="submit" value="Agrega un comentario" />
                                    </form>
                                </>
                            )}
                            <h2 css={css`
                                margin: 2rem 0;
                            `}>Comentarios:</h2>
                            {comments.length === 0 ? (<p>Aún no hay comentarios</p>) : (
                                <ul>
                                    {comments && comments.map((comment, i) => (
                                        <li
                                            key={i}
                                            css={css`
                                            border: 1px solid #e1e1e1;
                                            padding: 2rem;
                                        `}>
                                            <p>{comment.message}</p>
                                            <p>Escrito por: 
                                                <span css={css`
                                                    font-weight: bold;
                                                `}>{''}{comment.userName}</span>
                                            </p>
                                            {isCreator(comment.userID) && (
                                                <Creator>Es creador</Creator>
                                            )}
                                        </li>
                                    ))}
                                </ul>  
                            )}
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
                                <Buttons onClick={() => vote()}>Votar</Buttons>
                            </div>
                        </aside>
                    </ContenedorProducto>
                </div>
            </Layout>
        </>
    );
}
 
export default Details;