import React, { createContext, useContext, ReactNode } from 'react';
import { useOktaAuth, AuthState, AuthService } from '@okta/okta-react';

interface AuthContextType {
  authState: AuthState | undefined;
  authService: AuthService;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { authState, authService } = useOktaAuth();

  return (
    <AuthContext.Provider value={{ authState, authService }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
