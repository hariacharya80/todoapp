import { Dispatch, SetStateAction, useContext, useState } from "react";
import { AuthContext } from "../hooks/AuthProvider";

interface LogoutDialogProps {
  showDialog: Dispatch<SetStateAction<boolean>>;
}

function LogoutDialog({ showDialog }: LogoutDialogProps) {
  const { logout } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  return (
    <>
      <section className="absolute left-0 top-0 backdrop-blur-md w-screen h-screen flex justify-center">
        <div className="bg-white shadow-2xl p-10 min-w-fit w-fit rounded mt-12 h-fit">
          <h1 className="font-semibold text-2xl">Logout</h1>
          <span>Are you sure you want to logout?</span>
          <div className="w-full flex gap-5 mt-2">
            <button
              disabled={loading}
              onClick={() => showDialog(false)}
              className={
                loading
                  ? "transition-all bg-slate-200 text-black hover:bg-slate-100 cursor-not-allowed rounded px-8 py-1"
                  : "transition-all bg-slate-500 hover:bg-slate-800 text-white rounded px-8 py-1"
              }
            >
              Cancel
            </button>
            <button
              disabled={loading}
              onClick={async () => {
                setLoading(true);
                await logout();
                setLoading(false);
              }}
              className={
                loading
                  ? "bg-slate-200 px-8 py-1 gap-2 w-full rounded flex justify-center items-center cursor-not-allowed"
                  : "transition-all bg-rose-500 hover:bg-rose-800 text-white rounded px-8 py-1"
              }
            >
              {loading ? (
                <>
                  <div className="w-3 h-3 rounded-full border-2 border-black border-t-white border-l-white animate-spin"></div>
                  <span>Please wait</span>
                </>
              ) : (
                "Logout"
              )}
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default LogoutDialog;
