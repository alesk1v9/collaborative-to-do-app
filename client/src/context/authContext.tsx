import { createContext, useContext, useEffect, useState } from "react";
import { getUserFromToken, isLoggedIn, logout as performLogout } from "../utils/auth";
import type { AuthContextProps } from "../types/authContext";
import type { userProps } from "../types/user";

const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuth, setIsAuth] = useState(isLoggedIn());
  const [user, setUser] = useState<userProps | null>(getUserFromToken(localStorage.getItem("token") || ""));

  const login = (token: string) => {
    localStorage.setItem("token", token);
    setIsAuth(true);
    setUser(getUserFromToken(token));
  };

  const logout = () => {
    performLogout();
    setIsAuth(false);
    setUser(null);
  };

  useEffect(() => {
    if (isLoggedIn()) {
      const token = localStorage.getItem("token")!;
      setUser(getUserFromToken(token));
    }
  }, []);
return (
  <AuthContext.Provider value={{ isAuth, user, login, logout }}>
    {children}
  </AuthContext.Provider>
)
}

export const useAuth = () => useContext(AuthContext)!;