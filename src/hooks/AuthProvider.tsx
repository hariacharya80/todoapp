import React, { createContext, useState } from "react";

export const AuthContext = createContext({
  user: {
    signedIn: false,
    authToken: "",
  },
  logout: () => {
    return null;
  },
  login: () => {
    return null;
  },
});

interface AuthContextProviderProps {
  children: React.ReactElement;
}

function AuthProvider({ children }: AuthContextProviderProps) {
  const [authState, setAuthState] = useState({
    signedIn: false,
    authToken: "",
  });

  const login = () => {
    //will write login for the login request
    setAuthState({
      signedIn: true,
      authToken: "demo",
    });
    return null;
  };

  const logout = () => {
    //will write logout for the logout request
    setAuthState({
      signedIn: false,
      authToken: "",
    });
    return null;
  };

  return (
    <AuthContext.Provider
      value={{
        user: {
          authToken: authState.authToken,
          signedIn: authState.signedIn,
        },
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
