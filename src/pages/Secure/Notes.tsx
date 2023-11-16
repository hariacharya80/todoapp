import { useState } from "react";
import ReactDOM from "react-dom";
import AddNotes from "../../components/dialogs/AddNotes";
interface notesType {
  title: string;
  createdAt: string;
  content: string;
}

function Notes() {
  const [notesList, setNotesList] = useState<notesType[]>([]);
  const [showAddNote, setShowAddNote] = useState(false);

  return (
    <>
      {showAddNote &&
        ReactDOM.createPortal(
          <AddNotes showDialog={setShowAddNote} />,
          document.getElementById("dialog") as HTMLElement
        )}
      <section>
        <section className="w-full flex justify-between items-center my-2">
          <div>
            <h1 className="font-bold text-3xl">Notes</h1>
            <span className="text-slate-500">
              Never forget important things!
            </span>
          </div>
          <button
            onClick={() => setShowAddNote((prev) => !prev)}
            className="bg-indigo-500 hover:bg-indigo-800 text-white px-8 py-2 transition-all duration-100 rounded "
          >
            Add New Note
          </button>
        </section>
        {notesList.length < 1 && (
          <section className="w-full flex justify-center">
            <div className="flex flex-col gap-3 items-center my-10">
              <img src="/images/empty.png" alt="No items found." />
              <h1 className="font-bold text-3xl">Nothing to Worry!</h1>
              <p className="text-slate-500">
                You have nothing to remember on your notes.
              </p>
              <button
                onClick={() => setShowAddNote((prev) => !prev)}
                className="bg-indigo-500 text-white px-10 py-1 w-2/3 rounded transition-colors hover:bg-indigo-800 mt-2"
              >
                Add New Note
              </button>
            </div>
          </section>
        )}
      </section>
    </>
  );
}

export default Notes;
