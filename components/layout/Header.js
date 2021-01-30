import React from 'react';
import Link from 'next/link';
import Searcher from '../UI/Searcher';
import Navigation from './Navigation';

const Header = () => {
    return (
        <header>
            <div>
                <div>
                    <p>P</p>

                    <Searcher />
                    <Navigation />
                </div>

                <div>
                    <p>Hola: Dylan</p>
                    <button type="button">Cerrar Sesión</button>

                    <Link href="/">Login</Link>
                    <Link href="/">Crear cuenta</Link>
                </div>
            </div>
        </header>
    );
}
 
export default Header;