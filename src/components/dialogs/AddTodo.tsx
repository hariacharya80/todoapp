import { Dispatch, SetStateAction, useContext, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../hooks/AuthProvider";

interface AddTodoProps {
  showDialog: Dispatch<SetStateAction<boolean>>;
}

function AddTodo({ showDialog }: AddTodoProps) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);

  const addNewTodo = async () => {
    try {
      const request = await fetch(import.meta.env.VITE_BACKEND + "/todo", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ email: user.user, name: name }),
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
  return (
    <section className="left-0 top-0 absolute w-screen h-screen backdrop-blur-md flex justify-center">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setLoading(true);
          await addNewTodo();
          setLoading(false);
        }}
        className="bg-white border-2 p-4 min-w-fit h-fit w-1/3 rounded mt-4"
      >
        <h1 className="font-semibold text-xl">Add Todo</h1>
        <label htmlFor="name">Task name: </label>
        <input
          type="text"
          required
          disabled={loading}
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border-2 p-1 rounded w-full"
          id="name"
          placeholder="Read about another technology."
        />
        <div className="flex justify-between gap-3 mt-2">
          <button
            type="reset"
            disabled={loading}
            className={
              loading
                ? "bg-slate-100 px-8 py-1 rounded cursor-not-allowed"
                : "bg-slate-100 px-8 py-1 rounded"
            }
            onClick={() => showDialog(false)}
          >
            Cancel
          </button>
          <button
            disabled={loading}
            type="submit"
            className={
              loading
                ? "flex justify-center items-center gap-2 text-white px-8 py-1 rounded cursor-wait bg-slate-300"
                : "bg-indigo-500 flex justify-center items-center gap-2 text-white px-8 py-1 rounded"
            }
          >
            {loading && (
              <div className="border-2 w-3 rounded-full animate-spin h-3 border-t-white border-black"></div>
            )}
            Add Todo
          </button>
        </div>
      </form>
    </section>
  );
}

export default AddTodo;
