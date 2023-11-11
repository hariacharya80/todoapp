import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Reset from "./pages/Auth/Reset";
import { useContext } from "react";
import { AuthContext } from "./hooks/AuthProvider";
import AlreadySignedIn from "./pages/messages/AlreadySignedIn";
import Dashboard from "./pages/Secure/Dashboard";
import NotFound from "./pages/messages/NotFound";
import LoginRequired from "./pages/messages/LoginRequired";
import { Toaster } from "react-hot-toast";
import SignupSuccessful from "./pages/messages/SignupSuccessful";
import VerifyEmailToken from "./components/VerifyEmailToken";

function App() {
  const { user } = useContext(AuthContext);
  // console.log("The user signin status in App.tsx is: " + user.signedIn);
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/auth/login"
          element={user.signedIn ? <AlreadySignedIn /> : <Login />}
        />
        <Route
          path="/auth/signup"
          element={user.signedIn ? <AlreadySignedIn /> : <Signup />}
        />
        <Route
          path="/auth/reset"
          element={user.signedIn ? <AlreadySignedIn /> : <Reset />}
        />

        <Route
          path="/dashboard"
          element={user.signedIn ? <Dashboard /> : <LoginRequired />}
        />
        <Route
          path="/auth/signup/success"
          element={
            user.signedIn ? (
              <Navigate to={"/dashboard"} />
            ) : (
              <SignupSuccessful />
            )
          }
        />
        <Route
          path="/auth/verify"
          element={user.signedIn ? <Dashboard /> : <VerifyEmailToken />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
