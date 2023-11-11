import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import ReactDOM from "react-dom";
import AddTodo from "../../components/dialogs/AddTodo";
import { AuthContext } from "../../hooks/AuthProvider";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

interface todoItemTypes {
  name: string;
  _id: string;
  user: string;
  completed: boolean;
}

function Todo() {
  const [todoList, setTodoList] = useState<todoItemTypes[]>([]);
  const [showAddTodoList, setShowAddTodoList] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [loading, setLoading] = useState("");
  const { user } = useContext(AuthContext);

  const loadTodoList = async () => {
    const request = await fetch(import.meta.env.VITE_BACKEND + "/todo/get", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email: user.user }),
    });
    if (request.status === 200) {
      const data = await request.json();
      return setTodoList(data.list);
    } else if (request.status === 401) {
      const data = await request.json();
      return toast.error(data.msg);
    }
  };

  useEffect(() => {
    loadTodoList().then(() => {
      setFetching(false);
    });
  }, [showAddTodoList]);
  return (
    <>
      {showAddTodoList &&
        ReactDOM.createPortal(
          <AddTodo showDialog={setShowAddTodoList} />,
          document.getElementById("dialog") as HTMLElement
        )}
      <section>
        <h1>Todo List</h1>
        <button
          onClick={() => setShowAddTodoList((prev) => !prev)}
          className="bg-slate-100 hover:bg-slate-300 transition-colors px-8 py-1 rounded"
        >
          Add New Todo
        </button>
        {fetching && <span>Please wait, the data is being loaded......</span>}
        {!fetching && (
          <>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 lg:grid-cols-4 gap-x-4">
              {todoList.map((todo) => {
                return (
                  <div
                    key={todo._id}
                    className={
                      loading == todo.name
                        ? "bg-indigo-200 my-2 p-2  rounded w-full gap-2 flex justify-center items-center"
                        : "bg-slate-100 my-2 p-2  rounded flex justify-between items-center"
                    }
                  >
                    {loading != todo.name && (
                      <>
                        <span
                          onClick={() => {
                            setLoading(todo.name);
                          }}
                          className="flex items-center gap-2"
                        >
                          <input
                            className="scale-150"
                            type="checkbox"
                            defaultChecked={todo.completed}
                          />
                          <span className="text-md">{todo.name}</span>
                        </span>
                        <span className="flex gap-2">
                          <button className="bg-indigo-500 text-white transition-colors p-2 rounded hover:bg-indigo-100 hover:text-black">
                            <FaEdit />
                          </button>
                          <button className="bg-rose-500 text-white transition-colors p-2 rounded hover:bg-rose-100 hover:text-black">
                            <AiFillDelete />
                          </button>
                        </span>
                      </>
                    )}
                    {loading == todo.name && (
                      <>
                        <span>Updating, please wait... </span>
                        <div className="w-3 rounded-full h-3 border-2 border-black border-t-white animate-spin"></div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </section>
    </>
  );
}

export default Todo;
