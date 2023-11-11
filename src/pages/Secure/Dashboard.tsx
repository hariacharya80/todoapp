import { useContext } from "react";
import { AuthContext } from "../../hooks/AuthProvider";

function Dashboard() {
  const { logout } = useContext(AuthContext);
  return (
    <div>
      Dashboard
      <button onClick={() => logout()}>logout</button>
    </div>
  );
}

export default Dashboard;
