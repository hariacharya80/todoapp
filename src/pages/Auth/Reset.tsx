import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingDialog from "../../components/LoadingDialog";
import ReactDOM from "react-dom";
import UseBackend from "../../hooks/UseBackend";

function Reset() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { resetPassword } = UseBackend();
  const [email, setEmail] = useState("");
  document.title = "Reset Password | MyTodoApp";
  return (
    <>
      {loading &&
        ReactDOM.createPortal(
          <LoadingDialog />,
          document.getElementById("dialog") as HTMLElement
        )}
      <section className="absolute min-w-2/3 top-0 left-0 flex justify-center w-screen min-h-screen bg-slate-200">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setLoading(true);
            await resetPassword(email);
            setLoading(false);
          }}
          className="bg-white flex flex-col items-center h-fit p-12 mt-12"
        >
          <h1 className="font-bold text-3xl">Password Reset</h1>
          <p className="mb-2 text-slate-500">
            Please provide your email address to reset password.
          </p>
          <div className="w-full flex justify-start">
            <label htmlFor="email">Email : </label>
          </div>
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="w-full border-2 p-1 rounded"
            type="email"
            name="email"
            id="email"
            placeholder="jhon.sharma@gmail.com"
          />
          <button
            type="submit"
            className="my-2 p-2 rounded bg-indigo-500 text-white w-full hover:bg-indigo-800 transition-colors"
          >
            Send Reset Email
          </button>
          <a
            href="/auth/login"
            onClick={(e) => {
              e.preventDefault();
              return navigate("/auth/login");
            }}
            type="reset"
            className="text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
          >
            Back to Login
          </a>
        </form>
      </section>
    </>
  );
}

export default Reset;
