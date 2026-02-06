import { createContext, useState, useEffect, ReactNode } from 'react';
import { login as loginApi, signup as signupApi, updateProfile } from '../api/auth'; // Import updateProfile

interface User {
  _id: string;
  username: string;
  email: string;
  token: string;
}

interface AuthContextType {
  user: User | null;
  login: (userData: any) => Promise<void>;
  signup: (userData: any) => Promise<void>;
  logout: () => void;
  updateUser: (userId: string, profileData: { username?: string, email?: string }) => Promise<void>; // Add updateUser
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (userData: any) => {
    const data = await loginApi(userData);
    setUser(data);
    localStorage.setItem('user', JSON.stringify(data));
  };

  const signup = async (userData: any) => {
    const data = await signupApi(userData);
    setUser(data);
    localStorage.setItem('user', JSON.stringify(data));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const updateUser = async (userId: string, profileData: { username?: string, email?: string }) => {
    const updatedUserData = await updateProfile(userId, profileData);
    if (user) {
      const newUser = { ...user, ...updatedUserData };
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
