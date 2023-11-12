import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingDialog from "../../components/LoadingDialog";
import ReactDOM from "react-dom";
import UseBackend from "../../hooks/UseBackend";

function Reset() {
  const urlSearch = new URLSearchParams(document.location.search);
  const token = urlSearch.get("token");
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
        {!token && (
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
        )}
        {token && (
          <form className="bg-white rounded mt-12 items-center flex flex-col gap-2 h-fit p-12 w-1/3 min-w-fit">
            <h1 className="font-bold text-3xl">Change Password</h1>
            <span className="text-slate-500 -mt-2">
              Please provide a new password for your account.
            </span>
            <fieldset className="w-full">
              <div className="w-full mb-1 mt-2 flex justify-start">
                <label htmlFor="password">New password :</label>
              </div>
              <input
                className="border-2 p-1 rounded w-full "
                type="password"
                name="password"
                id="password"
                placeholder="********"
              />
            </fieldset>
            <fieldset className="w-full">
              <div className="w-full flex justify-start">
                <label htmlFor="confirm-password">Confirm Password :</label>
              </div>
              <input
                className="border-2 p-1 rounded w-full"
                placeholder="********"
                type="password"
                name="confirm-password"
                id="confirm-password"
              />
            </fieldset>
            <button className="bg-indigo-500 py-2 rounded w-full text-white hover:bg-indigo-800 transition-colors mt-3">
              Set New Password
            </button>
            <span className="text-slate-500">
              Back to{" "}
              <a
                className="hover:text-black transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  return navigate("/auth/login");
                }}
                href="/auth/login"
              >
                Login
              </a>
            </span>
          </form>
        )}
      </section>
    </>
  );
}

export default Reset;
