import { Dispatch, SetStateAction, useContext } from "react";
import { AuthContext } from "./AuthProvider";
import toast from "react-hot-toast";

function UseTodo() {
  const { user } = useContext(AuthContext);
  const addNewTodo = async (
    title: string,
    showDialog: Dispatch<SetStateAction<boolean>>
  ) => {
    try {
      const request = await fetch(import.meta.env.VITE_BACKEND + "/todo", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ email: user.user, name: title }),
      });
      if (request.status === 200) {
        showDialog(false);
        return toast.success("Todo added successfully.");
      } else if (request.status === 401) {
        const data = await request.json();
        return toast.error(data.msg);
      } else if (request.status === 500) {
        return toast.error("An unknown server error occoured.");
      }
      return toast.error("An unknown error occoured.");
    } catch (err) {
      return toast.error("An unknown server error occoured.");
    }
  };

  return { addNewTodo };
}
export default UseTodo;
