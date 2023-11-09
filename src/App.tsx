import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Reset from "./pages/Auth/Reset";
import { useContext } from "react";
import { AuthContext } from "./hooks/AuthProvider";
import AlreadySignedIn from "./pages/messages/AlreadySignedIn";
import Dashboard from "./pages/Secure/Dashboard";
import NotFound from "./pages/messages/NotFound";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {!user.signedIn ? (
          <>
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/signup" element={<Signup />} />
            <Route path="/auth/reset" element={<Reset />} />
          </>
        ) : (
          <>
            <Route path="/auth/login" element={<AlreadySignedIn />} />
            <Route path="/auth/signup" element={<AlreadySignedIn />} />
            <Route path="/auth/reset" element={<AlreadySignedIn />} />
          </>
        )}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
