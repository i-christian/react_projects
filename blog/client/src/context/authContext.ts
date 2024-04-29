import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { Value } from "sass";

interface User {
  id: number;
  name: string;
  password?: string;
  email?: string;
}

interface AuthContextType {
  currentUser: User | null;
  login: (inputs: User) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  login: async () => {},
  logout: async () => {},
});



export const AuthContexProvider = ({ children }: React.PropsWithChildren) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = async (inputs: User) => {
    try {
      const res = await axios.post<User>("/auth/login", inputs);
      setCurrentUser(res.data);
    } catch (error) {
      console.error("Login error:", error);
      // Handle login error if needed
    }
  };

  const logout = async () => {
    try {
      await axios.post("/auth/logout");
      setCurrentUser(null);
    } catch (error) {
      console.error("Logout error:", error);
      // Handle logout error if needed
    }
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);


  return (
    <AuthContext.Provider Value={{currentUser, logout, login}}>{children}</AuthContext.Provider>
  );

};
