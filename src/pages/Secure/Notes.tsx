import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import AddNotes from "../../components/dialogs/AddNotes";
import UseNotes from "../../hooks/UseNotes";
import toast from "react-hot-toast";
interface notesType {
  title: string;
  createdAt: string;
  content: string;
}

function Notes() {
  const [notesList, setNotesList] = useState<notesType[]>([]);
  const [loading, setLoading] = useState(true);
  const [triggerReload, setTriggerReload] = useState(1);
  const [showAddNote, setShowAddNote] = useState(false);
  const [networkError, setNetworkError] = useState(false);
  const { getNotesList } = UseNotes();

  useEffect(() => {
    getNotesList().then((value) => {
      if (value.ok) {
        setNotesList(value.data);
      } else {
        setNetworkError(true);
      }
      return setLoading(false);
    });
  }, [showAddNote, triggerReload]);

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
        {!loading && !networkError && notesList.length < 1 && (
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
        {loading && (
          <section className="w-full flex justify-center my-10">
            <div className="flex flex-col items-center">
              <div className="border-4 border-black border-t-white w-10 h-10 rounded-full animate-spin"></div>
              <h1 className="mt-3">Please wait...</h1>
            </div>
          </section>
        )}
        {!loading && networkError && (
          <section className="w-full flex justify-center my-10">
            <div className="flex flex-col items-center">
              <img src="/images/interneterr.png" alt="No network" />
              <h1 className="mt-3 font-bold text-2xl mb-2">
                Internet Connection Error
              </h1>
              <span>
                There was an error while connecting to server and loading data.
              </span>
              <button
                onClick={() => setTriggerReload((prev) => prev + 1)}
                style={{ backgroundColor: "" }}
                className="text-white w-1/3 bg-[#0d62ab] px-8 py-1 my-2 rounded hover:bg-[#0c508a] transition-colors"
              >
                Try Reload
              </button>
            </div>
          </section>
        )}
      </section>
    </>
  );
}

export default Notes;
