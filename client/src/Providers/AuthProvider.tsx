import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../data/store';

interface AuthContextType {
  token: string;
}

export const AuthContext = React.createContext<AuthContextType>(null!);

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
  const authStore = useSelector((state: RootState) => state.auth);

  return <AuthContext.Provider value={{token: authStore.authToken}}>{children}</AuthContext.Provider>
};