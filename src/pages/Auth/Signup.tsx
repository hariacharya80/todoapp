import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import UseBackend from "../../hooks/UseBackend";
import toast from "react-hot-toast";
import LoadingDialog from "../../components/LoadingDialog";
import SignupValidator from "../../utils/SignupValidator";
import { useNavigate } from "react-router-dom";

function Signup() {
  const { signup } = UseBackend();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isAgreed, setIsAgreed] = useState(true);

  const [nameValidation, setNameValidation] = useState({
    err: false,
    msg: "",
  });

  const [emailValidation, setEmailValidation] = useState({
    err: false,
    msg: "",
  });

  const [passwordValidation, setPasswordValidation] = useState({
    err: false,
    msg: "",
  });

  const [confirmPasswordValidation, setConfirmPasswordValidation] = useState({
    err: false,
    msg: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Signup | MyTodoApp";
  }, []);
  return (
    <>
      {loading &&
        ReactDOM.createPortal(
          <LoadingDialog />,
          document.getElementById("dialog") as HTMLElement
        )}
      <section className="absolute left-0 top-0 w-screen h-screen bg-slate-200 flex justify-center">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const isValid = SignupValidator(
              email,
              password,
              name,
              isAgreed,
              confirmPassword,
              setNameValidation,
              setEmailValidation,
              setPasswordValidation,
              setConfirmPasswordValidation
            );
            if (!isValid) return;
            setLoading(true);
            const result = await signup(name, password, email);
            if (result.err) {
              toast.error(result.msg);
            } else {
              toast.success("User signed up successfully.");
            }
            return setLoading(false);
          }}
          className="bg-white h-fit mt-5 p-12 w-1/3 min-w-fit rounded flex flex-col gap-2 text-center"
        >
          <h1 className="font-bold text-3xl">Create an Account</h1>
          <span className="text-slate-500 -mt-2">
            Please provide your information to signup.
          </span>
          <div className="flex justify-start text-left -mb-2">
            <span className="text-black">Full name: </span>
          </div>
          <input
            type="text"
            placeholder="Jhon Sharma"
            value={name}
            onChange={(e) => {
              setNameValidation({
                err: false,
                msg: "",
              });
              setName(e.target.value);
            }}
            className={
              nameValidation.err
                ? "border-2 p-1 rounded w-full border-rose-500 outline-rose-500"
                : "border-2 p-1 rounded w-full"
            }
          />{" "}
          {nameValidation.err && (
            <div className="flex justify-start text-left -mt-2">
              <span className="text-rose-500">{nameValidation.msg}</span>
            </div>
          )}{" "}
          <div className="flex justify-start text-left -mb-2">
            <span className="text-black">Email address: </span>
          </div>
          <input
            type="text"
            value={email}
            onChange={(e) => {
              setEmailValidation({
                err: false,
                msg: "",
              });
              setEmail(e.target.value);
            }}
            className={
              emailValidation.err
                ? "border-2 outline-rose-500 border-rose-500 p-1 rounded w-full"
                : "border-2 p-1 rounded w-full"
            }
            name="email"
            id="email"
            placeholder="jhon.sharma@gmail.com"
          />
          {emailValidation.err && (
            <div className="flex justify-start text-left -mt-2">
              <span className="text-rose-500">{emailValidation.msg}</span>
            </div>
          )}
          <div className="flex justify-start text-left -mb-2">
            <span className="text-black">Password : </span>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPasswordValidation({
                err: false,
                msg: "",
              });
              setPassword(e.target.value);
            }}
            name="password"
            className={
              passwordValidation.err
                ? "border-2 p-1 outline-rose-500 border-rose-500 rounded w-full"
                : "border-2 p-1 rounded w-full"
            }
            id="password"
            placeholder="********"
          />
          {passwordValidation.err && (
            <div className="flex justify-start text-left -mt-2">
              <span className="text-rose-500">{passwordValidation.msg}</span>
            </div>
          )}
          <div className="flex justify-start text-left -mb-2">
            <span className="text-black">Confirm password: </span>
          </div>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setConfirmPasswordValidation({
                err: false,
                msg: "",
              });
            }}
            placeholder="********"
            className={
              confirmPasswordValidation.err
                ? "border-2 outline-rose-500 border-rose-500 p-1 rounded w-full"
                : "border-2 p-1 rounded w-full"
            }
          />{" "}
          {confirmPasswordValidation.err && (
            <div className="flex justify-start text-left -mt-2">
              <span className="text-rose-500">
                {confirmPasswordValidation.msg}
              </span>
            </div>
          )}
          <div className="w-full flex left-0 items-center gap-1 cursor-pointer">
            <input
              type="checkbox"
              checked={isAgreed}
              onChange={() => setIsAgreed((prev) => !prev)}
              name="agree"
              id="agree"
            />
            <label htmlFor="agree">I agree to the terms & conditions.</label>
          </div>
          <button className="bg-indigo-500 text-white w-full py-2 rounded hover:bg-indigo-800 transition-colors duration-300">
            Create Account
          </button>
          <span className="text-slate-500">
            Already have an account?{" "}
            <a
              onClick={(e) => {
                e.preventDefault();
                navigate("/auth/login");
              }}
              className="hover:text-slate-800"
              href="/auth/login"
            >
              Log in.
            </a>
          </span>
        </form>
      </section>
    </>
  );
}

export default Signup;
