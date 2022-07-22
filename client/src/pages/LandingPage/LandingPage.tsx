import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../../components/shared/LoginButton";
import LogoutButton from "../../components/shared/LogoutButton";
import { setAuthToken } from "../../data/slices/authSlice";

export const LandingPage = () => {
  const dispatch = useDispatch();
  const [accessToken, setAccessToken] = useState("");

  const { user, isAuthenticated, getAccessTokenWithPopup } = useAuth0();

  useEffect(() => {
    (async () => {
      try {
        const token = await getAccessTokenWithPopup({
          audience: "https://bugsplatt-api.io",
        });
        console.log("token is: ", token);
        setAccessToken(token);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [getAccessTokenWithPopup, isAuthenticated]);

  useEffect(() => {
    if (accessToken) {
      dispatch(setAuthToken(accessToken));
      // TODO: trigger redirect
    }
  }, [accessToken]);

  return <div>
{isAuthenticated && user && (
        <div>
          <img src={user.picture} alt={user.name} />
          <h2>{user.nickname}</h2>
          <Link to="/app">App Dashboard</Link>
          <br />
          <Link to="/app/projects">Projects</Link>
          <br />
          <Link to="/app/teams">Teams</Link>
        </div>
      )}
      {isAuthenticated ? <LogoutButton /> : <LoginButton />}
  </div>;
};
