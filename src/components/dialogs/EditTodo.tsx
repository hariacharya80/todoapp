import { Dispatch, SetStateAction, useState } from "react";

interface editTodoProps {
  name: string;
  showDialog: Dispatch<SetStateAction<boolean>>;
}

function EditTodo({ name, showDialog }: editTodoProps) {
  const [newname, setName] = useState("");
  return (
    <dialog className="absolute bg-transparent backdrop-blur-md z-50 left-0 top-0 flex justify-center w-screen h-screen">
      <div className="bg-white border-slate-500 border-2 w-1/3 min-w-fit mt-12 h-fit p-4 rounded">
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
            onClick={() => showDialog(false)}
            className="w-1/5 bg-rose-500 transition-colors hover:bg-rose-800 text-white py-1 rounded"
          >
            Cancel
          </button>
          <button className="w-1/3 transition-colors bg-indigo-500 hover:bg-indigo-800 text-white py-1 rounded">
            Save Changes
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default EditTodo;
