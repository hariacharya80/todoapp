import { Dispatch, SetStateAction, useState } from "react";
import UseNotes from "../../hooks/UseNotes";

interface AddNotesProps {
  showDialog: Dispatch<SetStateAction<boolean>>;
}

function AddNotes({ showDialog }: AddNotesProps) {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { addNote } = UseNotes();

  return (
    <section className="w-screen flex justify-center h-screen backdrop-blur-md absolute left-0 top-0">
      <div className=" bg-white h-fit mt-10 p-5 rounded-xl w-full flex flex-col items-start md:w-2/3 border-2 ">
        <div className="flex w-full flex-col items-center">
          <h1 className="font-bold text-3xl">New Note</h1>
          <p className="text-sm text-slate-500">
            Add something new that you don't want to forget.
          </p>
        </div>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setLoading(true);
            const success = await addNote(title, content);
            if (success) {
              showDialog(false);
            }
            setLoading(false);
          }}
          className="flex flex-col w-full"
          action=""
        >
          <label htmlFor="title" className="mt-2">
            Title:{" "}
          </label>
          <input
            type="text"
            disabled={loading}
            name="title"
            id="title"
            required
            className="border-2 p-1 rounded text-md w-full"
            placeholder="React Framework or Library?"
          />
          <label htmlFor="content" className="mt-2">
            Note :
          </label>
          <textarea
            required
            name="content"
            disabled={loading}
            id="content"
            placeholder={`Developers have spent a great deal of time talking about what React is. But they have left out why this topic matters so greatly for anyone who builds React applications.

The answer to this question is essential for any React developer, regardless of their skill level. This is because it indicates what they must know and how they must work in developing any React application.

Whether you are a new or an advanced React developer, I hope this thoughtful analysis will improve your own development process as you build your next React project.`}
            className="border-2 p-2 rounded w-full h-[50vh]"
          ></textarea>
          <div className="w-full flex justify-between my-2">
            <button
              onClick={() => showDialog(false)}
              type="reset"
              disabled={loading}
              className={
                loading
                  ? "bg-rose-200 cursor-not-allowed text-white px-10 py-1 rounded transition-colors"
                  : "bg-rose-500 text-white px-10 py-1 rounded hover:bg-rose-800 transition-colors"
              }
            >
              Cancel
            </button>
            <button
              disabled={loading}
              type="submit"
              className={
                loading
                  ? "bg-indigo-300 cursor-wait flex items-center justify-center gap-2 text-white  py-1 rounded transition-colors px-10 "
                  : "bg-indigo-500 text-white hover:bg-indigo-800 py-1 rounded transition-colors px-10 "
              }
            >
              {loading && (
                <div className="w-4 h-4 rounded-full animate-spin border-2 border-black border-t-white"></div>
              )}
              Add Note
            </button>
          </div>
          {loading && (
            <div className="w-full -mt-2 flex justify-end">
              <span>{"Hold on, we're saving it.."}</span>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}

export default AddNotes;
