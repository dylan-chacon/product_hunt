import '../styles/globals.css'
import App from 'next/app';
import useAuth from '../hooks/useAuth';
import firebase, { FirebaseContext } from '../firebase';

const MyApp = (props) => {
  const { Component, pageProps } = props;

  const user = useAuth();
  console.log('useeer', user);
  return(
    <FirebaseContext.Provider
      value={{
        firebase
      }}
    >
      <Component {...pageProps} />
    </FirebaseContext.Provider>
  );
}

export default MyApp;
