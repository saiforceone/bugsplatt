import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../data/store";
import { FECommonUserData } from "../interfaces";

interface CurrentUserContextAuth {
  currentUser?: FECommonUserData;
}

export const CurrentUserContext = React.createContext<CurrentUserContextAuth>(
  null!
);

export const CurrentUserProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const currentUserStore = useSelector((state: RootState) => state.currentUser);

  return (
    <CurrentUserContext.Provider
      value={{ currentUser: currentUserStore.currentUser }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};
