import React, { createContext, useState } from "react";

interface themeProviderProps {
  children: React.ReactElement;
}
export const ThemeContext = createContext({
  darkTheme: false,
  changeTheme: () => {
    return null;
  },
});

function ThemeProvider({ children }: themeProviderProps) {
  const [darkTheme, setDarkTheme] = useState(false);
  const changeTheme = () => {
    setDarkTheme(!darkTheme);
    return null;
  };
  return (
    <ThemeContext.Provider value={{ darkTheme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
export default ThemeProvider;
