import React, { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const AuthContext = createContext({
  user: {
    signedIn: false,
    authToken: "",
  },
  logout: async () => {},
  login: async (username: string, password: string) => {
    if (!username || !password) {
      //I hate ts sometime cause I don't know it enough. LoL
    }
    return false;
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

  useEffect(() => {
    const localData = localStorage.getItem("_auth");
    if (localData) {
      const authData = JSON.parse(localData);
      setAuthState(authData);
      return;
    } else {
      return;
    }
  }, []);

  const login = async (username: string, password: string) => {
    //will write login for the login request
    try {
      const request = await fetch(
        import.meta.env.VITE_BACKEND + "/auth/login",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );
      if (request.status === 200) {
        const data = await request.json();
        setAuthState({
          signedIn: true,
          authToken: data.token,
        });
        localStorage.setItem(
          "_auth",
          JSON.stringify({
            signedIn: true,
            authToken: data.token,
          })
        );
        return true;
      } else if (request.status === 401) {
        const data = await request.json();
        toast.error(data.msg);
        return false;
      } else if (request.status === 500) {
        toast.error("An unknown server error occurred.");
        return false;
      }
    } catch (err) {
      toast.error("There is a network error, please try again later.");
      return false;
    }
    return false;
  };

  const logout = async () => {
    //will write logout for the logout request
    setAuthState({
      signedIn: false,
      authToken: "",
    });
    localStorage.clear();
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
