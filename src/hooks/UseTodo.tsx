import { Dispatch, SetStateAction, useContext } from "react";
import { AuthContext } from "./AuthProvider";
import toast from "react-hot-toast";

interface todoItemTypes {
  name: string;
  _id: string;
  user: string;
  completed: boolean;
}

function UseTodo() {
  const { user } = useContext(AuthContext);

  const getAllTodo = async (
    setTodoList: Dispatch<SetStateAction<todoItemTypes[]>>
  ) => {
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

  const markTodoComplete = async (_id: string) => {
    try {
      const request = await fetch(
        import.meta.env.VITE_BACKEND + "/todo/complete",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ _id }),
        }
      );
      if (request.status == 200) {
        toast.success("Task marked as complete.");
        return true;
      } else if (request.status == 401) {
        const data = await request.json();
        toast.error(data.msg);
        return false;
      } else if (request.status == 500) {
        toast.error("Unknown server error occoured.");
        return false;
      }
    } catch (e) {
      toast.error("Unknown network error occoured.");
      return false;
    }
  };
  const markTodoIncomplete = async (_id: string) => {
    try {
      const request = await fetch(
        import.meta.env.VITE_BACKEND + "/todo/incomplete",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ _id }),
        }
      );
      if (request.status == 200) {
        toast.success("Task marked as not completed.");
        return true;
      } else if (request.status == 401) {
        const data = await request.json();
        toast.error(data.msg);
        return false;
      } else if (request.status == 500) {
        toast.error("Unknown server error occoured.");
        return false;
      }
    } catch (e) {
      toast.error("Unknown network error occoured.");
      return false;
    }
  };
  const deleteTodo = async (_id: string) => {
    try {
      const request = await fetch(import.meta.env.VITE_BACKEND + "/todo", {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ _id }),
      });
      if (request.status == 200) {
        toast.success("Task deleted successfully.");
        return true;
      } else if (request.status == 401) {
        const data = await request.json();
        toast.error(data.msg);
        return false;
      } else if (request.status == 500) {
        toast.error("Unknown server error occoured.");
        return false;
      }
    } catch (e) {
      toast.error("Unknown network error occoured.");
      return false;
    }
  };
  const updateTodo = async (id: string, name: string) => {
    //do something here to update the todo
    const request = await fetch(import.meta.env.VITE_BACKEND + "/todo", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
        name,
      }),
    });
    if (request.status === 200) {
      toast.success("Todo updated successfully.");
      return true;
    } else if (request.status == 401) {
      const data = await request.json();
      toast.error(data.msg);
      return true;
    } else if (request.status == 500) {
      toast.error("An unknown internal server error occoured.");
      return false;
    }
    toast.error("An unknown error while updating todo.");
    return false;
  };
  return {
    addNewTodo,
    getAllTodo,
    updateTodo,
    markTodoComplete,
    markTodoIncomplete,
    deleteTodo,
  };
}
export default UseTodo;
