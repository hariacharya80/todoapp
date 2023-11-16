import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import toast from "react-hot-toast";

function UseNotes() {
  const { user } = useContext(AuthContext);
  const addNote = async (title: string, content: string) => {
    const request = await fetch(import.meta.env.VITE_BACKEND + "/notes", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ title, content, user: user.user }),
    });
    if (request.status === 200) {
      toast.success("Note added successfully.");
      return true;
    } else if (request.status === 401) {
      const data = await request.json();
      toast.error(data.msg);
      return false;
    } else if (request.status === 500) {
      toast.error("An unknown internal server error, please try again later.");
      return false;
    }
    toast.error("An unknown error occoured.");
    return false;
  };
  return { addNote };
}

export default UseNotes;
