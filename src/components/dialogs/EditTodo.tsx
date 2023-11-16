import { Dispatch, SetStateAction, useState } from "react";
import UseTodo from "../../hooks/UseTodo";

interface editTodoProps {
  name: string;
  _id: string;
  showDialog: Dispatch<SetStateAction<boolean>>;
}

function EditTodo({ name, _id, showDialog }: editTodoProps) {
  const [newname, setName] = useState("");
  const { updateTodo } = UseTodo();
  const [loading, setLoading] = useState(false);

  return (
    <dialog className="absolute bg-transparent backdrop-blur-md z-50 left-0 top-0 flex justify-center w-screen h-screen">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setLoading(true);
          const success = await updateTodo(_id, newname);
          // setLoading(false);
          if (success) {
            showDialog(false);
          }
        }}
        className="bg-white border-slate-500 border-2 w-1/3 min-w-fit mt-12 h-fit p-4 rounded"
      >
        <h1 className="font-bold text-xl">Edit Todo</h1>
        <label htmlFor="name">New name: </label>
        <input
          className="p-1 border-2 w-full rounded"
          type="text"
          name="name"
          value={newname}
          onChange={(e) => setName(e.target.value)}
          id="name"
          placeholder={name}
        />
        <div className="w-full gap-2 flex justify-between items-center  mt-2">
          <button
            type="reset"
            disabled={loading}
            onClick={() => showDialog(false)}
            className={
              loading
                ? "w-1/5 bg-rose-300 transition-colors  text-white py-1 rounded cursor-not-allowed"
                : "w-1/5 bg-rose-500 transition-colors hover:bg-rose-800 text-white py-1 rounded"
            }
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className={
              loading
                ? "w-1/3 transition-colors bg-slate-500 hover:bg-slate-800 flex items-center justify-center gap-2 cursor-wait text-white py-1 rounded"
                : "w-1/3 transition-colors bg-indigo-500 hover:bg-indigo-800 text-white py-1 rounded"
            }
          >
            {loading && (
              <div className="w-4 h-4 border-2 border-black border-t-white animate-spin rounded-full"></div>
            )}
            Save Changes
          </button>
        </div>
      </form>
    </dialog>
  );
}

export default EditTodo;
