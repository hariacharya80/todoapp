import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";
import LoadingDialog from "../../components/LoadingDialog";
import UseBackend from "../../hooks/UseBackend";
import toast from "react-hot-toast";

function SignupSuccessful() {
  const navigate = useNavigate();
  const urlSearch = new URLSearchParams(document.location.search);
  const [email] = useState(urlSearch.get("email") || null);
  const [loading, setLoading] = useState(false);
  const { sendEmailVerification } = UseBackend();
  document.title = "Verify Email | MyTodoApp";
  return (
    <>
      {loading &&
        ReactDOM.createPortal(
          <LoadingDialog />,
          document.getElementById("dialog") as HTMLElement
        )}
      <section className="left-0 top-0 absolute w-screen h-screen bg-slate-200 flex justify-center">
        <div className="bg-white p-12 rounded h-fit mt-12 w-fit flex flex-col items-center">
          <img src="/mail.png" alt="" />
          <h1 className="font-bold text-3xl">Verify your email</h1>
          {email && (
            <span className="w-full text-slate-500 bg-slate-100 flex justify-center p-1 rounded">
              {email}
            </span>
          )}
          <p className="mt-2">Your account have been created successfully.</p>
          <span>
            Please check your email for a verification link before signing in.
          </span>
          <button
            onClick={async () => {
              if (!email)
                return toast.error(
                  "Can not send an email. Please check your inbox for an existing email."
                );
              setLoading(true);
              await sendEmailVerification(email);
              setLoading(false);
              return;
            }}
            className="bg-indigo-600 hover:bg-indigo-800 text-white w-1/2 rounded transition-colors duration-300  p-1 my-2"
          >
            Resend Verification Email
          </button>
          <a
            href="/auth/help"
            onClick={(e) => {
              e.preventDefault();
              return navigate("/auth/help");
            }}
            className="text-slate-500 mt-2 hover:text-black"
          >
            Need help?
          </a>
        </div>
      </section>
    </>
  );
}

export default SignupSuccessful;
