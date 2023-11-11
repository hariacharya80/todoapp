import { FaUserCircle, FaVideo } from "react-icons/fa";
import { BiLogOutCircle, BiNotepad, BiSolidHome } from "react-icons/bi";
import { LuListTodo } from "react-icons/lu";
import { FaCircleInfo } from "react-icons/fa6";

function MobileMenu() {
  return (
    <section className="flex flex-col gap-2">
      <h1>Main Menu</h1>

      <button className="w-[95vw] p-3 items-center flex gap-2 rounded bg-slate-500 text-white">
        <BiSolidHome />
        <span>Home</span>
      </button>

      <button className="w-[95vw] p-3 items-center flex gap-2 rounded bg-slate-500 text-white">
        <LuListTodo />
        <span>Todo</span>
      </button>

      <button className="w-[95vw] p-3 items-center flex gap-2 rounded bg-slate-500 text-white">
        <BiNotepad />
        <span>Notes</span>
      </button>

      <button className="w-[95vw] p-3 items-center flex gap-2 rounded bg-slate-500 text-white">
        <FaVideo />
        <span>Meetings</span>
      </button>

      <button className="w-[95vw] p-3 items-center flex gap-2 rounded bg-slate-500 text-white">
        <FaUserCircle />
        <span>Account</span>
      </button>

      <button className="w-[95vw] p-3 items-center flex gap-2 rounded bg-slate-500 text-white">
        <FaCircleInfo />
        <span>About</span>
      </button>

      <button className="w-[95vw] p-3 items-center flex gap-2 rounded bg-rose-500 text-white">
        <BiLogOutCircle />
        <span>Logout</span>
      </button>
    </section>
  );
}

export default MobileMenu;
