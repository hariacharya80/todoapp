import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import toast from "react-hot-toast";

function UseNotes() {
  const { user } = useContext(AuthContext);
  const addNote = async (title: string, content: string) => {
    try {
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
        toast.error(
          "An unknown internal server error, please try again later."
        );
        return false;
      }
      throw new Error("No internet or fetch issues.");
    } catch (err) {
      toast.error("An unknown error occoured.");
      return false;
    }
  };
  const getNotesList = async () => {
    try {
      const request = await fetch(import.meta.env.VITE_BACKEND + "/notes");
      if (request.status === 200) {
        const data = await request.json();
        // No successfull toast message because it will be called frequently.
        return { ok: true, data: data };
      } else if (request.status === 401) {
        const data = await request.json();
        toast.error(data.msg);
        return { ok: false };
      } else if (request.status === 500) {
        toast.error("An unknown server error occoured.");
        return { ok: false };
      }
      throw new Error("No internet or fetch issues.");
    } catch (error) {
      toast.error("An unknown error loading data.");
      return { ok: false };
    }
  };
  return { addNote, getNotesList };
}

export default UseNotes;
