import { Dispatch, SetStateAction, useContext, useState } from "react";
import UseTodo from "../../hooks/UseTodo";

interface AddTodoProps {
  showDialog: Dispatch<SetStateAction<boolean>>;
}

function AddTodo({ showDialog }: AddTodoProps) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const { addNewTodo } = UseTodo();
  return (
    <section className="left-0 top-0 absolute w-screen h-screen backdrop-blur-md flex justify-center">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setLoading(true);
          await addNewTodo(name, showDialog);
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
