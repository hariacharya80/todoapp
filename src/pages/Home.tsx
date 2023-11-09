import { useContext } from "react";

import AppLogo from "../assets/logo.png";
import { ThemeContext } from "../hooks/ThemeProvider";
import { AuthContext } from "../hooks/AuthProvider";
import { useNavigate } from "react-router-dom";

function Home() {
  const { darkTheme, changeTheme } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);
  const themeStyle = {
    lightBody:
      "p-4 w-screen  text-center pt-16 gap-2  h-screen bg-slate-100 absolute left-0 top-0 flex items-center flex-col",
    darkBody:
      "p-4 w-screen text-center   pt-16 gap-2 h-screen bg-slate-800 text-white absolute left-0 top-0 flex items-center flex-col",
  };
  const navigate = useNavigate();
  return (
    <section className={darkTheme ? themeStyle.darkBody : themeStyle.lightBody}>
      <img
        src={AppLogo}
        alt="Application Logo"
        className="w-1/12 min-w-[150px]"
      />
      <h1 className="font-bold text-4xl text-black">Welcome to MyTodoApp</h1>
      <p>
        Open Source Full-Stack Web Application built with React, Nodejs, Express
        and Mongodb.
      </p>
      <div className="flex gap-2 p-2">
        <a
          className="border-2 bg-rose-600 text-white px-8 py-1 rounded hover:bg-rose-800 transition-colors duration-300 border-rose-600 hover:border-rose-800"
          href="https://hari-acharya.com.np/blog/project-todo"
          target="_blank"
        >
          Learn More
        </a>
        <button
          onClick={() => {
            if (user.signedIn) {
              return navigate("/dashboard");
            }
            return navigate("/auth/login");
          }}
          className="bg-indigo-500 hover:bg-indigo-800 text-white px-8 py-1 rounded transition-colors duration-300"
        >
          {user.signedIn ? "Continue to Dashboard" : "Log in to Dashboard"}
        </button>
      </div>
      <a
        href="https://github.com/HariAcharya80/ToDoApp"
        target="_blank"
        className="text-slate-500 hover:text-slate-900 cursor-pointer transition-colors duration-300"
      >
        View Source Code
      </a>
    </section>
  );
}

export default Home;
