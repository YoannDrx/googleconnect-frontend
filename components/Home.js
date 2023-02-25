import { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import jwtDecode from 'jwt-decode';
import styles from '../styles/Home.module.css';

const clientId = '492308766796-4rukpcc44v9mhjrtk98ibj9eoan212qa.apps.googleusercontent.com';

function Home() {
  const [user, setUser] = useState(null);

  const handleLogin = (credentialResponse) => {
    setUser(jwtDecode(credentialResponse.credential));
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className={styles.container}>
        {user ?
          <div className={styles.content}>
            <h1>Welcome {user.name}!</h1>
            <div className={styles.divider}></div>
            <p>Email: {user.email}</p>
          </div>
          : <div className={styles.content}>
            <h1>Welcome</h1>
            <h2>Log in to you Google account to continue</h2>
            <div className={styles.divider}></div>
            <GoogleLogin
              onSuccess={(credentialResponse) => handleLogin(credentialResponse)}
              onError={((error) => console.error(error))}
            />
          </div>}
      </div>
    </GoogleOAuthProvider>
  );
}

export default Home;
