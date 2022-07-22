import { useLocation, Navigate }  from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth"

export const IsAuthenticated = ({children}: {children: JSX.Element}) => {
  const auth = useAuth();
  const location = useLocation();

  if (!auth || !auth.token) {
    return <Navigate to="/" state={{ from: location }} replace />
  }

  return children;
}
