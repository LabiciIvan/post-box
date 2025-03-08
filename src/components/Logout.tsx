import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { logoutUser } from "../hooks/Auth";
import { deleteLocalStorageForLoggedOutUser } from "../tests/database-mock";

const Logout = () => {

  const auth = useContext(AuthContext);

  const {user, login, logout} = auth;

  if (!user) {
    return <Navigate to={'/post-box/login'}/>
  }

  const [isDoorOpen, setIsDoorOpen] = useState<boolean>(false);

  const handleLogoutUser = (): void => {

    deleteLocalStorageForLoggedOutUser(user.id);
    // Proceed to log out user
    logoutUser(user);

    logout();
  }

  return (
    <button
      className='logout-button'
      onClick={handleLogoutUser}
      onMouseEnter={() => setIsDoorOpen(() => true)}
      onMouseLeave={() => setIsDoorOpen(() => false)}
    >
      {
        isDoorOpen ? 
        <i className='bi bi-door-open'/>
        :
        <i className='bi bi-door-closed'/>
      }
      Sign out
    </button>
  )
}

export default Logout;