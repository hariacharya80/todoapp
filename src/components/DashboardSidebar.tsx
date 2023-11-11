import { useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";
import { BiLogOutCircle, BiNotepad, BiSolidHome } from "react-icons/bi";
import { FaUserCircle, FaVideo } from "react-icons/fa";
import { FaCircleInfo } from "react-icons/fa6";
import { LuListTodo } from "react-icons/lu";
import { useState } from "react";
import SidebarButton from "./buttons/SidebarButton";
import LogoutDialog from "./LogoutDialog";
function Sidebar() {
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();
  const [currentMenu, setCurrentMenu] = useState("Home");
  return (
    <>
      {showLogout &&
        ReactDOM.createPortal(
          <LogoutDialog showDialog={setShowLogout} />,
          document.getElementById("dialog") as HTMLElement
        )}
      <aside className="border-r-2 p-4 hidden md:flex shadow-2xl min-w-fit w-[15vw] transition-all flex-col">
        <h1
          className="font-bold text-3xl mb-4 cursor-pointer"
          onClick={() => {
            return navigate("/dashboard");
          }}
        >
          MyTodoApp
        </h1>

        <SidebarButton
          setCurrentMenu={setCurrentMenu}
          currentItem={currentMenu}
          icon={<BiSolidHome />}
          name="Home"
          link="/dashboard"
        />
        <SidebarButton
          setCurrentMenu={setCurrentMenu}
          currentItem={currentMenu}
          icon={<LuListTodo />}
          name="Todo"
          link="/todo"
        />
        <SidebarButton
          setCurrentMenu={setCurrentMenu}
          currentItem={currentMenu}
          icon={<BiNotepad />}
          name="Notes"
          link="/notes"
        />
        <SidebarButton
          setCurrentMenu={setCurrentMenu}
          currentItem={currentMenu}
          icon={<FaVideo />}
          name="Meetings"
          link="/meetings"
        />
        <SidebarButton
          setCurrentMenu={setCurrentMenu}
          currentItem={currentMenu}
          icon={<FaUserCircle />}
          name="Account"
          link="/account"
        />
        <SidebarButton
          setCurrentMenu={setCurrentMenu}
          currentItem={currentMenu}
          icon={<FaCircleInfo />}
          name="About"
          link="/about"
        />
        <button
          onClick={() => setShowLogout((prev) => !prev)}
          className="flex items-center gap-2 hover:bg-rose-500 transition-all hover:text-white w-full bg-rose-200 text-black p-2 rounded"
        >
          <span className="text-xl">
            <BiLogOutCircle />
          </span>
          <span>Logout</span>
        </button>
      </aside>
    </>
  );
}

export default Sidebar;
