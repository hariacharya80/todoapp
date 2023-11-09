import { useContext } from "react";
import { ThemeContext } from "./hooks/ThemeProvider";

function App() {
  const { darkTheme, changeTheme } = useContext(ThemeContext);
  const lightClass = "p-4 w-screen h-screen bg-slate-100 absolute left-0 top-0";
  const darkClass =
    "p-4 w-screen h-screen bg-slate-800 text-white absolute left-0 top-0";
  return (
    <>
      <div className={darkTheme ? darkClass : lightClass}>
        <h1>
          {darkTheme ? "Dark Theme is Enabled" : "Dark theme is disabled."}
        </h1>
        <button
          className={
            darkTheme
              ? "border-2 rounded px-4 py-1 bg-slate-900 border-slate-950 text-white"
              : "border-2 rounded px-4 py-1 bg-slate-200"
          }
          onClick={() => changeTheme()}
        >
          Toggle Theme
        </button>
      </div>
    </>
  );
}

export default App;
