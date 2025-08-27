import React, { createContext, useContext, useState } from "react";

type User = { name?: string; email: string; password: string };
type AuthState = { isAuthed: boolean; user?: User };

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState<AuthState>({ isAuthed: false });

  const login = (user: User) => {
    setAuth({ isAuthed: true, user });
  };

  const register = (name: string, email: string, password: string) => {
    const newUser: User = { name, email, password };
    setAuth({ isAuthed: true, user: newUser });
  };

  const logout = () => setAuth({ isAuthed: false });

  return (
    <AuthContext.Provider value={{ auth, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
