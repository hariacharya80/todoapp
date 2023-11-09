import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginRequired() {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();
  useEffect(() => {
    const countInterval = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(countInterval);
  }, []);
  useEffect(() => {
    if (count === 0) {
      return navigate("/auth/login");
    }
  }, [count, navigate]);
  return (
    <section className="w-screen h-screen bg-slate-200 flex justify-center">
      <div className="bg-white h-fit mt-12 p-12 rounded flex flex-col text-center w-1/3 min-w-[400px] gap-1">
        <h1 className="font-bold text-3xl">Login Required</h1>
        <p className="text-slate-600">You must sign in to view this page.</p>
        <button
          onClick={() => navigate("/auth/login")}
          className="bg-indigo-500 text-white py-1 rounded-xl my-4 hover:bg-indigo-800 cursor-pointer transition-colors duration-300 "
        >
          Go to Login
        </button>
        <span className="text-slate-400">
          Redirecting you to login in {count} seconds.
        </span>
      </div>
    </section>
  );
}

export default LoginRequired;
