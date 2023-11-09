import { useNavigate } from "react-router-dom";

function AlreadySignedIn() {
  const navigate = useNavigate();
  return (
    <section className="absolute w-screen h-screen bg-slate-200 flex justify-center text-center">
      <div className="w-1/3 flex flex-col gap-2 my-12">
        <h1 className="font-bold text-3xl">You are already logged in.</h1>
        <p>
          We have found that someone is already logged in, you can continue to
          dashboard or login to a different account.
        </p>
        <div className="gap-2 flex flex-col">
          <button
            onClick={() => {
              return navigate("/dashboard");
            }}
            className="bg-rose-500 text-white px-8 py-1 rounded-md"
          >
            Continue
          </button>
          <a href="/auth/logout" className="text-slate-600">
            User another account
          </a>
        </div>
      </div>
    </section>
  );
}

export default AlreadySignedIn;
