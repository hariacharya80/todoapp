import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./assets/global.css";
import ThemeProvider from "./hooks/ThemeProvider.tsx";
import AuthProvider from "./hooks/AuthProvider.tsx";

ReactDOM.createRoot(document.getElementsByTagName("main")[0]!).render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
);
