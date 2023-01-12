
import React, { useState, createContext } from 'react'

interface IAuthenticatedContext {
  name: string;
}

export const AuthenticatedContext = createContext<any>(null)

export const AuthenticatedProvider = ({ children }: any) => {
  const [user, setUser] = useState(null)

  return (
    <AuthenticatedContext.Provider value={{ user, setUser }}>
      {children}
    </AuthenticatedContext.Provider>
  );
};