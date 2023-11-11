import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Reset from "./pages/Auth/Reset";
import { useContext } from "react";
import { AuthContext } from "./hooks/AuthProvider";
import NotFound from "./pages/messages/NotFound";
import { Toaster } from "react-hot-toast";
import SignupSuccessful from "./pages/messages/SignupSuccessful";
import VerifyEmailToken from "./components/VerifyEmailToken";
import DashboardLayout from "./pages/Secure/DashboardLayout";
import Dashboard from "./pages/Secure/Dashboard";
import Todo from "./pages/Secure/Todo";
import Notes from "./pages/Secure/Notes";
import Meetings from "./pages/Secure/Meetings";
import Account from "./pages/Secure/Account";
import About from "./pages/Secure/About";

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
          element={
            user.signedIn ? <Navigate to="/dashboard" replace /> : <Login />
          }
        />
        <Route
          path="/auth/signup"
          element={
            user.signedIn ? <Navigate to="/dashboard" replace /> : <Signup />
          }
        />
        <Route
          path="/auth/reset"
          element={
            user.signedIn ? <Navigate to="/dashboard" replace /> : <Reset />
          }
        />

        <Route
          path="/dashboard"
          element={
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          }
        />
        <Route
          path="/todo"
          element={
            <DashboardLayout>
              <Todo />
            </DashboardLayout>
          }
        />
        <Route
          path="/notes"
          element={
            <DashboardLayout>
              <Notes />
            </DashboardLayout>
          }
        />
        <Route
          path="/meetings"
          element={
            <DashboardLayout>
              <Meetings />
            </DashboardLayout>
          }
        />
        <Route
          path="/account"
          element={
            <DashboardLayout>
              <Account />
            </DashboardLayout>
          }
        />
        <Route
          path="/about"
          element={
            <DashboardLayout>
              <About />
            </DashboardLayout>
          }
        />
        <Route
          path="/auth/signup/success"
          element={
            user.signedIn ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <SignupSuccessful />
            )
          }
        />
        <Route
          path="/auth/verify"
          element={
            user.signedIn ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <VerifyEmailToken />
            )
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
