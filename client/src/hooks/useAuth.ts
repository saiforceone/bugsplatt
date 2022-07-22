import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";

export const useAuth = () => useContext(AuthContext);
