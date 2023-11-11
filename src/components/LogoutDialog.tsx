import { Dispatch, SetStateAction, useContext, useState } from "react";
import ReactDOM from "react-dom";
import { AuthContext } from "../hooks/AuthProvider";
import LoadingDialog from "./LoadingDialog";

interface LogoutDialogProps {
  showDialog: Dispatch<SetStateAction<boolean>>;
}

function LogoutDialog({ showDialog }: LogoutDialogProps) {
  const { logout } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  return (
    <>
      {loading &&
        ReactDOM.createPortal(
          <LoadingDialog />,
          document.getElementById("dialog") as HTMLElement
        )}
      <section className="absolute left-0 top-0 backdrop-blur-md w-screen h-screen flex justify-center">
        <div className="bg-white shadow-2xl p-10 min-w-fit w-fit rounded mt-12 h-fit">
          <h1 className="font-semibold text-2xl">Logout</h1>
          <span>Are you sure you want to logout?</span>
          <div className="w-full flex gap-5 mt-2">
            <button
              onClick={() => showDialog(false)}
              className="transition-all bg-slate-500 hover:bg-slate-800 text-white rounded px-8 py-1"
            >
              Cancel
            </button>
            <button
              onClick={async () => {
                setLoading(true);
                await logout();
                return setLoading(false);
              }}
              className="transition-all bg-rose-500 hover:bg-rose-800 text-white rounded px-8 py-1"
            >
              Logout
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default LogoutDialog;
