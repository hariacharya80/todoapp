import { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import LoadingDialog from "../../components/LoadingDialog";
import { AuthContext } from "../../hooks/AuthProvider";
import { useNavigate } from "react-router-dom";
import { Turnstile } from "@marsidev/react-turnstile";
import toast from "react-hot-toast";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [longCookie, setLongCookie] = useState(true);
  const [captcha, setCaptcha] = useState(false);
  const [emailValidation, setEmailValidation] = useState({
    err: false,
    msg: "",
  });

  const [passwordValidation, setPasswordValidation] = useState({
    err: false,
    msg: "",
  });

  const validateLoginInformation = async () => {
    if (!username) {
      return setEmailValidation({
        err: true,
        msg: "Email address is required.",
      });
    }
    if (
      !username
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      return setEmailValidation({
        err: true,
        msg: "Please provide a valid email address.",
      });
    }
    //email was validated successfully, reset the err msg
    setEmailValidation({
      err: false,
      msg: "",
    });

    //now validate the password
    if (!password) {
      return setPasswordValidation({
        err: true,
        msg: "Password is required.",
      });
    }
    if (password.length < 8) {
      return setPasswordValidation({
        err: true,
        msg: "Password must be at least 8 characters long.",
      });
    }

    //password was validated successfully, reset the err msg
    setPasswordValidation({ err: false, msg: "" });

    //check captcha status
    if (!captcha) {
      return toast.error("Please complete the captcha.");
    }
    //now start the login process.
    await loginHandler();
    return;
  };

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  // Effect for smooth transition wile the page renders and requests are made to the server.
  useEffect(() => {
    document.title = "Login | MyTodoApp";
    if (!loading) return;
    const loadingTimer = setTimeout(() => {
      setLoading(false);
    }, 0);
    return () => {
      clearTimeout(loadingTimer);
    };
  }, [loading]);

  const loginHandler = async () => {
    setLoading(true);
    const loginOk = await login(username, password);
    setLoading(false);
    if (loginOk) {
      return navigate("/dashboard");
    } else {
      return;
    }
  };

  useEffect(() => {
    setEmailValidation({
      err: false,
      msg: "",
    });
    setPasswordValidation({
      err: false,
      msg: "",
    });
  }, [username, password]);
  return (
    <>
      {loading &&
        ReactDOM.createPortal(
          <LoadingDialog />,
          document.getElementById("dialog") as HTMLElement
        )}
      <section className="bg-slate-200 h-screen w-screen absolute top-0 left-0 flex justify-center">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            validateLoginInformation();
          }}
          className="p-8 rounded bg-white h-fit mt-16 text-center py-12 w-1/3 min-w-fit"
        >
          <h1 className="font-bold text-3xl">Log in to Dashboard</h1>
          <p className="text-slate-500 mt-1">
            Please login to access your information.
          </p>
          <div className="flex justify-start text-left -mb-2">
            <span className="text-black">Email : </span>
          </div>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="jhon.sharma@gmail.com"
            className={
              emailValidation.err
                ? "border-2 border-rose-500 p-1 rounded-md w-full mt-3"
                : "border-2 p-1 rounded-md w-full mt-3"
            }
          />
          {emailValidation.err && (
            <div className="w-full text-left">
              <span className="text-rose-500 text-sm">
                {emailValidation.msg}
              </span>
            </div>
          )}

          <fieldset className="flex flex-col mt-2  gap-2">
            <div className="flex justify-start text-left -mb-2">
              <span className="text-black">Password: </span>
            </div>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="*******"
              className={
                passwordValidation.err
                  ? "border-2 border-rose-500 p-1 rounded-md w-full -mb-1"
                  : "border-2 p-1 rounded-md w-full -mb-1"
              }
            />
            {passwordValidation.err && (
              <div className="w-full text-left">
                <span className="text-rose-500 text-sm">
                  {passwordValidation.msg}
                </span>
              </div>
            )}

            <div className="flex justify-between gap-12">
              <span className="select-none cursor-pointer flex gap-1 mb-2">
                <input
                  type="checkbox"
                  name="keep-login"
                  checked={longCookie}
                  onChange={(e) => setLongCookie(e.target.checked)}
                  id="keep-login"
                />
                <label htmlFor="keep-login">
                  Remember me on this computer.
                </label>
              </span>
              <a
                href="/auth/reset"
                className="cursor-pointer hover:text-slate-600 transition-colors duration-300"
              >
                Forgot password?
              </a>
            </div>
          </fieldset>

          <Turnstile
            siteKey="0x4AAAAAAAM7qlDAyv3bsg73"
            className="hidden"
            onSuccess={() => {
              console.log("Success");
              setCaptcha(true);
            }}
            onExpire={() => setCaptcha(false)}
          />

          <button
            // onClick={loginHandler}
            type="submit"
            className="w-full mt-1  bg-indigo-500 hover:bg-indigo-800 transition-colors duration-300 text-white py-2 rounded"
          >
            Log in
          </button>
          <p className="mt-2 text-slate-500">
            New user here?{" "}
            <a
              onClick={(e) => {
                e.preventDefault();
                return navigate("/auth/signup");
              }}
              href="/auth/signup"
              className="cursor-pointer hover:text-slate-800 transition-colors duration-300"
            >
              Sign up.
            </a>
          </p>
        </form>
      </section>
    </>
  );
}

export default Login;
