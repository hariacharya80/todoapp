import { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";

interface BottomMenuButtonProps {
  icon: React.ReactNode;
  name: string;
  currentMenu: string;
  link: string;
  setCurrentMenu: Dispatch<SetStateAction<string>>;
}

function BottomMenuButton({
  icon,
  name,
  currentMenu,
  link,
  setCurrentMenu,
}: BottomMenuButtonProps) {
  const activeClass = "flex flex-col items-center text-indigo-500";
  const inactiveClass = "flex flex-col items-center";
  const navigate = useNavigate();
  return (
    <button
      onClick={() => {
        setCurrentMenu(name);
        return navigate(link);
      }}
      className={name === currentMenu ? activeClass : inactiveClass}
    >
      <span className="text-3xl">{icon}</span>
      <span className="text-xl">{name}</span>
    </button>
  );
}

export default BottomMenuButton;
