import App from 'next/app';
import firebase, { FirebaseContext } from '../firebase';
import useAuth from '../hooks/useAuth';

const MyApp = props => {
    const user = useAuth();
    const { Component, pageProps } = props;
    const value = { user, firebase };

    return (
        <FirebaseContext.Provider
            value={{
                user,
                firebase
            }}
        >
            <Component {...pageProps} />
        </FirebaseContext.Provider>
    )
}

export default MyApp;
