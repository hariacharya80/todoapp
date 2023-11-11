import React, { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";

interface ButtonProps {
  name: string;
  currentItem: string;
  icon: React.ReactElement;
  link: string;
  setCurrentMenu: Dispatch<SetStateAction<string>>;
}
function SidebarButton({
  name,
  currentItem,
  icon,
  link,
  setCurrentMenu,
}: ButtonProps) {
  const navigate = useNavigate();
  const inactiveClass =
    "bg-slate-200 p-2 rounded my-1 flex justify-start gap-2 items-center transition-all";
  const activeClass =
    "border-l-4 border-l-indigo-500 bg-indigo-200 p-2 rounded my-1  flex justify-start gap-2 items-center transition-all ";
  return (
    <button
      onClick={() => {
        setCurrentMenu(name);
        navigate(link);
      }}
      className={name == currentItem ? activeClass : inactiveClass}
    >
      <span className="text-xl mb-1">{icon}</span>
      {name}
    </button>
  );
}

export default SidebarButton;
