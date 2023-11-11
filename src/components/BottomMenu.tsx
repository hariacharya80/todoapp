import { BiMenu, BiNotepad, BiSolidHome } from "react-icons/bi";
import BottomMenuButton from "./buttons/BottomMenu";
import { useState } from "react";
import { LuListTodo } from "react-icons/lu";

function BottomMenu() {
  const [currentMenu, setCurrentMenu] = useState("Home");
  return (
    <nav className="absolute bottom-0 w-screen bg-slate-200 shadow-xl md:hidden p-2 grid grid-cols-4">
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
  );
}

export default BottomMenu;
