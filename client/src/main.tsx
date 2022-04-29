import React from 'react'
import ReactDOM from 'react-dom/client'
import { Auth0Provider } from "@auth0/auth0-react";
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Auth0Provider
      audience="https://bugsplatt-api.io"
      domain="dev-whkdhipc.us.auth0.com"
      clientId="mov6FS0c9rkGDgjTMe6QhxETUtSWH85Y"
      redirectUri={window.location.origin}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
)
