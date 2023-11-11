import { BiMenu, BiNotepad, BiSolidHome } from "react-icons/bi";
import BottomMenuButton from "./buttons/BottomMenu";
import { useState } from "react";
import { LuListTodo } from "react-icons/lu";

function BottomMenu() {
  const [currentMenu, setCurrentMenu] = useState("Home");
  return (
    <div className="absolute bottom-0 w-screen h-fit bg-slate-200 shadow-xl flex items-center ">
      <nav className="md:hidden p-2 grid grid-cols-4 w-full">
        <BottomMenuButton
          setCurrentMenu={setCurrentMenu}
          currentMenu={currentMenu}
          name="Home"
          icon={<BiSolidHome />}
          link="/dashboard"
        />
        <BottomMenuButton
          setCurrentMenu={setCurrentMenu}
          currentMenu={currentMenu}
          name="Todo"
          icon={<LuListTodo />}
          link="/todo"
        />
        <BottomMenuButton
          setCurrentMenu={setCurrentMenu}
          currentMenu={currentMenu}
          name="Notes"
          icon={<BiNotepad />}
          link="/notes"
        />
        <BottomMenuButton
          setCurrentMenu={setCurrentMenu}
          currentMenu={currentMenu}
          name="Menu"
          icon={<BiMenu />}
          link="/menu"
        />
      </nav>
    </div>
  );
}

export default BottomMenu;
