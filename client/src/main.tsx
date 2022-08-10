import React from "react";
import ReactDOM from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import { Provider } from "react-redux";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import App from "./App";
import { store } from "./data/store";
import "./index.css";
import { AuthProvider } from "./Providers/AuthProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Auth0Provider
        scope={import.meta.env.VITE_AUTH0_SCOPE}
        audience={import.meta.env.VITE_AUTH0_AUDIENCE}
        domain={import.meta.env.VITE_AUTH0_DOMAIN}
        clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
        redirectUri={window.location.origin}
      >
        <AuthProvider>
          <App />
          <ToastContainer />
        </AuthProvider>
      </Auth0Provider>
    </Provider>
  </React.StrictMode>
);
