import { useEffect, useState } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import logo from './logo.svg'
import './App.css'
import LoginButton from './components/shared/LoginButton';

function App() {
  const [accessToken, setAccessToken] = useState('');

  const { user, isAuthenticated, getAccessTokenWithPopup } = useAuth0();

  useEffect(() => {
    (async () => {
      try {
        const token = await getAccessTokenWithPopup({
          audience: 'https://bugsplatt-api.io',
        });
        console.log('token is: ', token);
        setAccessToken(token);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [getAccessTokenWithPopup, isAuthenticated]);

  return (
    <div className="App">
      {isAuthenticated && user && (
        <div>
          <img src={user.picture} alt={user.name} />
          <h2>{user.nickname}</h2>
        </div>
      )}
      <LoginButton />
    </div>
  )
}

export default App
