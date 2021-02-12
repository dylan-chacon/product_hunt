import React, { useContext } from 'react';
import Link from 'next/link';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Button from '../UI/Button';
import Searcher from '../UI/Searcher';
import Navigation from './Navigation';
import { FirebaseContext } from '../../firebase';

const ContHeader = styled.div`
    max-width: 1200px;
    width: 95%;
    margin: 0 auto;
    @media (min-width:768px) {
        display: flex;
        justify-content: space-between;
    }
`;

const Logo = styled.p`
    color: var(--naranja);
    font-size: 4rem;
    line-height: 0;
    font-weight: 700;
    font-family: 'Roboto Slab', serif;
    margin-right: 2rem;
`;

const Header = () => {
    const {user, firebase} = useContext(FirebaseContext);

    return (
        <header
            css={css`
                border-bottom: 2px solid var(--gris3);
                padding: 1rem 0;
            `}
        >
            <ContHeader>
                <div
                    css={css`
                        display: flex;
                        align-items: center;
                    `}
                >
                    <Link href="/">
                        <Logo>P</Logo>
                    </Link>

                    <Searcher />
                    <Navigation />
                </div>

                <div
                    css={css`
                        display: flex;
                        align-items: center;
                    `}
                >
                    { user ? (
                        <>
                            <p css={css`margin-right: 2rem;`}>Hola: {user.displayName}</p>
                            <Button bgColor onClick={async () => await firebase.logOut()}>Cerrar Sesión</Button>
                        </>
                    ) : (
                        <>
                            <Link href="/login" passHref>
                                <Button bgColor>Login</Button>
                            </Link>
                            <Link href="/sign-in" passHref>
                                <Button>Crear cuenta</Button>
                            </Link>
                        </>
                    )}
                </div>
            </ContHeader>
        </header>
    );
}
 
export default Header;