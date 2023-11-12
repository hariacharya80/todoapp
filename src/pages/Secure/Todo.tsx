import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import AddTodo from "../../components/dialogs/AddTodo";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import UseTodo from "../../hooks/UseTodo";
import EditTodo from "../../components/dialogs/EditTodo";

interface todoItemTypes {
  name: string;
  _id: string;
  user: string;
  completed: boolean;
}

function Todo() {
  document.title = "Todo | MyTodoApp";
  const [todoList, setTodoList] = useState<todoItemTypes[]>([]);
  const [showAddTodoList, setShowAddTodoList] = useState(false);
  const [showEditTodo, setShowEditTodo] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState({
    name: "",
    _id: "",
  });
  const [fetching, setFetching] = useState(true);
  const [loading, setLoading] = useState("");
  const { getAllTodo } = UseTodo();

  useEffect(() => {
    getAllTodo(setTodoList).then(() => {
      setFetching(false);
    });
  }, [showAddTodoList, loading]);

  const { markTodoComplete, markTodoIncomplete, deleteTodo } = UseTodo();
  return (
    <>
      {showAddTodoList &&
        ReactDOM.createPortal(
          <AddTodo showDialog={setShowAddTodoList} />,
          document.getElementById("dialog") as HTMLElement
        )}
      {showEditTodo &&
        ReactDOM.createPortal(
          <EditTodo name={selectedTodo.name} showDialog={setShowEditTodo} />,
          document.getElementById("dialog") as HTMLElement
        )}
      <section>
        <div className="w-full flex justify-between items-center">
          <div className="flex flex-col gap-0">
            <h1 className="font-bold text-3xl my-2">Todo</h1>
            <span className="-mt-3 text-slate-500">
              Divide and rule your tasks!
            </span>
          </div>
          <button
            onClick={() => setShowAddTodoList((prev) => !prev)}
            className="bg-indigo-500 text-white hover:text-black hover:bg-slate-300 transition-colors px-8 py-1 rounded"
          >
            Add New Todo
          </button>
        </div>
        {fetching && (
          <div className="w-full flex justify-center items-center h-[50vh]">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 border-2 border-black border-t-indigo-500 rounded-full animate-spin"></div>
              <h1 className="font-bold text-xl  my-2">Loading todos...</h1>
              <div className="flex flex-col items-center bg-slate-300 mt-12 p-2 rounded-xl">
                <span>Did you know: </span>
                <span>
                  Those who break there task in small todo are 10x more
                  productive.
                </span>
              </div>
            </div>
          </div>
        )}
        {todoList.length < 1 && !fetching && (
          <div className="flex w-full justify-center my-2 py-[10vh]">
            <div className="flex flex-col gap-2 items-center">
              <img src="/images/empty.png" alt="No items found." />
              <h1 className="font-semibold text-3xl">Nothing to Worry.</h1>
              <p className="text-slate-400">
                Seems like you don't have added any tasks here.
              </p>
              <button
                onClick={() => setShowAddTodoList(true)}
                className="bg-indigo-500 w-1/2 px-8 py-1 rounded text-white hover:bg-indigo-700 transition-colors"
              >
                Add new task
              </button>
            </div>
          </div>
        )}
        {!fetching && (
          <>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 lg:grid-cols-4 gap-x-4">
              {todoList.map((todo) => {
                return (
                  <div
                    key={todo._id}
                    className={
                      loading == todo._id
                        ? "bg-indigo-200 my-2 p-2  rounded w-full gap-2 flex justify-center items-center"
                        : "bg-slate-100 my-2 p-2  rounded flex justify-between items-center"
                    }
                  >
                    {loading != todo._id && (
                      <>
                        <span
                          onClick={() => {
                            // setLoading(todo.name);
                          }}
                          className="flex items-center gap-2"
                        >
                          <input
                            className="scale-150"
                            type="checkbox"
                            title={
                              todo.completed
                                ? "Make not completed"
                                : "Make completed."
                            }
                            onChange={async () => {
                              setLoading(todo._id);
                              if (!todo.completed) {
                                await markTodoComplete(todo._id);
                                setLoading("");
                              } else {
                                await markTodoIncomplete(todo._id);
                                setLoading("");
                              }
                            }}
                            checked={todo.completed}
                          />
                          <span
                            className={
                              todo.completed
                                ? "text-md line-through"
                                : "text-md"
                            }
                          >
                            {todo.name}
                          </span>
                        </span>
                        <span className="flex gap-2">
                          {!todo.completed && (
                            <button
                              onClick={() => {
                                setSelectedTodo({
                                  name: todo.name,
                                  _id: todo._id,
                                });
                                setShowEditTodo(true);
                              }}
                              className="bg-indigo-500 text-white transition-colors p-2 rounded hover:bg-indigo-100 hover:text-black"
                            >
                              <FaEdit />
                            </button>
                          )}
                          <button
                            onClick={async () => {
                              setLoading(todo._id);
                              const ans = confirm("This task will be deleted.");
                              if (ans) await deleteTodo(todo._id);
                              setLoading("");
                            }}
                            className="bg-rose-500 text-white transition-colors p-2 rounded hover:bg-rose-100 hover:text-black"
                          >
                            <AiFillDelete />
                          </button>
                        </span>
                      </>
                    )}
                    {loading == todo._id && (
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
