import { useContext } from "react";
import { CurrentUserContext } from "../Providers/CurrentUserProvider";

export const useCurrentUser = () => useContext(CurrentUserContext);
