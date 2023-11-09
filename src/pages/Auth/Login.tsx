import { useState } from "react";

function Login() {
  const [wrongPasswordCount] = useState(3);
  return (
    <section className="bg-slate-200 h-screen w-screen absolute top-0 left-0 flex justify-center">
      <div className="p-8 bg-white h-fit mt-16 text-center py-8 w-1/3 min-w-fit">
        <h1 className="font-bold text-3xl">Log in to Dashboard</h1>
        <p className="text-slate-500 mt-1">
          Please login to access your information.
        </p>
        <input
          type="text"
          placeholder="Email or Username"
          className="border-2 p-1 rounded-md w-full mt-3"
        />
        <fieldset className="flex flex-col mt-2  gap-2">
          <input
            type="password"
            placeholder="Password"
            className="border-2 p-1 rounded-md w-full -mb-1"
          />
          {wrongPasswordCount > 1 && (
            <div className="text-left">
              <span>
                Forgot password? <a href="/auth/reset">reset</a>
              </span>
            </div>
          )}
        </fieldset>
        <button className="w-full mt-4  bg-indigo-500 hover:bg-indigo-800 transition-colors duration-300 text-white py-2 rounded">
          Log in
        </button>
        <span className="mt-3">
          New user here? <a href="/auth/signup">Sign up.</a>
        </span>
      </div>
    </section>
  );
}

export default Login;
