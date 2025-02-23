import { createContext, useEffect, useState } from 'react';
import { User, AuthContextType } from '../types';
import { isUserLoggedIn } from '../hooks/Auth';

const AuthContext = createContext<AuthContextType>({
  user: false,
  login: () => {},
  logout: () => {}
});

const AuthProvider = ({children}: {children: React.ReactNode}) => {

  const [user, setUser] = useState<User | false>(false);

  const login = (user: User): void => {
    setUser(() => user);
  }

  const logout = (): void => {
    setUser(() => false);
  }

  // Get the logged user when component mounts.
  useEffect(() => {
    setUser(() => isUserLoggedIn());
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;

export {
  AuthContext
}