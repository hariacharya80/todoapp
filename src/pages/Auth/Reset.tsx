import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import UseBackend from "../../hooks/UseBackend";
import toast from "react-hot-toast";

function Reset() {
  const urlSearch = new URLSearchParams(document.location.search);
  const token = urlSearch.get("token");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { resetPassword } = UseBackend();
  const [email, setEmail] = useState("");
  if (!token) {
    document.title = "Reset Password | MyTodoApp";
  } else {
    document.title = "Change Password | MyTodoApp";
  }

  //state varibales for setting new password
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordValidation, setPasswordValidation] = useState({
    err: false,
    msg: "",
  });

  const [confirmPasswordValidation, setConfirmPasswordValidation] = useState({
    err: false,
    msg: "",
  });

  const { setNewPasswordWithToken } = UseBackend();

  const validateNewPasswords = () => {
    if (!newPassword) {
      toast.error("New password can not be empty.");
      setPasswordValidation({
        err: true,
        msg: "New password can not be empty.",
      });
      return false;
    }
    if (newPassword.length < 8) {
      toast.error("New password must be at least 8 characters.");
      setPasswordValidation({
        err: true,
        msg: "New password must be at least 8 characters long.",
      });
      return false;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Confirmation password do not match.");
      setConfirmPasswordValidation({
        err: true,
        msg: "Confirmation password do not match.",
      });
      return false;
    }
    return true;
  };

  const handlePasswordChange = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (!token) {
      setLoading(false);
      return toast.error("Error with your token, request a new reset link.");
    }
    const isValid = validateNewPasswords();
    if (isValid) {
      await setNewPasswordWithToken(token, confirmPassword);
    } else return setLoading(false);
    setLoading(false);
  };

  return (
    <>
      <section className="absolute top-0 left-0 flex justify-center w-screen min-h-screen bg-slate-200">
        {!token && (
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setLoading(true);
              await resetPassword(email);
              setLoading(false);
            }}
            className="bg-white w-1/3 min-w-fit rounded flex flex-col items-center h-fit p-12 mt-12"
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
              disabled={loading}
              name="email"
              id="email"
              placeholder="jhon.sharma@gmail.com"
            />
            <button
              type="submit"
              className={
                loading
                  ? "flex justify-center cursor-not-allowed items-center gap-2 my-2 p-2 rounded bg-indigo-500 text-white w-full hover:bg-indigo-800 transition-colors"
                  : "flex justify-center items-center gap-2 my-2 p-2 rounded bg-indigo-500 text-white w-full hover:bg-indigo-800 transition-colors"
              }
            >
              {loading && (
                <div className="w-4 h-4 border-2 rounded-full border-black border-t-white animate-spin"></div>
              )}
              {loading ? "Please wait..." : "Send Reset Email"}
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
          <form
            onSubmit={handlePasswordChange}
            className="bg-white rounded mt-12 items-center flex flex-col gap-2 h-fit p-12 w-1/3 min-w-fit"
          >
            <h1 className="font-bold text-3xl">Change Password</h1>
            <span className="text-slate-500 -mt-2">
              Please provide a new password for your account.
            </span>

            <div className="w-full -mb-2 flex justify-start">
              <label htmlFor="password">New password :</label>
            </div>
            <input
              className={
                passwordValidation.err
                  ? "border-2 p-1 rounded w-full border-rose-500 outline-rose-500"
                  : "border-2 p-1 rounded w-full "
              }
              type="password"
              name="password"
              value={newPassword}
              onChange={(e) => {
                setPasswordValidation({
                  err: false,
                  msg: "",
                });
                setConfirmPasswordValidation({
                  err: false,
                  msg: "",
                });
                setNewPassword(e.target.value);
              }}
              disabled={loading}
              id="password"
              placeholder="********"
            />
            {passwordValidation.err && (
              <span className="text-rose-500 w-full -mt-2">
                {passwordValidation.msg}
              </span>
            )}
            <div className="w-full flex justify-start">
              <label htmlFor="confirm-password">Confirm Password :</label>
            </div>
            <input
              className={
                confirmPasswordValidation.err
                  ? "border-2 p-1 rounded w-full outline-rose-500 border-rose-500"
                  : "border-2 p-1 rounded w-full"
              }
              placeholder="********"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPasswordValidation({
                  err: false,
                  msg: "",
                });
                setConfirmPassword(e.target.value);
              }}
              disabled={loading}
              type="password"
              name="confirm-password"
              id="confirm-password"
            />
            {confirmPasswordValidation.err && (
              <span className="text-rose-500 w-full -mt-2">
                {confirmPasswordValidation.msg}
              </span>
            )}
            <button
              className={
                loading
                  ? "flex justify-center cursor-not-allowed items-center gap-2 bg-indigo-500 py-2 rounded w-full text-white hover:bg-indigo-800 transition-colors mt-3"
                  : "flex justify-center items-center gap-2 bg-indigo-500 py-2 rounded w-full text-white hover:bg-indigo-800 transition-colors mt-3"
              }
            >
              {loading && (
                <div className="w-4 h-4 rounded-full animate-spin border-2 border-black border-t-white"></div>
              )}
              {loading ? "Please wait..." : "Set New Password"}
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
