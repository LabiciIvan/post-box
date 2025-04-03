import { useContext, useEffect } from 'react';
import { logoutUser } from './hooks/Auth';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import UnreadEmailCountContext from './context/ReadEmailContext';
import { deleteLocalStorageForLoggedOutUser } from './tests/database-mock';

const App = ({children} : {children: React.ReactNode}) => {

  const unreadEmailsContext = useContext(UnreadEmailCountContext);

  const {updateCount} = unreadEmailsContext;

  const auth = useContext(AuthContext);

  const { user } = auth;

  const location = useLocation();

  const handleElegantUserLogout = (): void => {
    if (!user) return;

    const currentDate = new Date();

    const userDate = new Date(user.logoutAfter);

    if (userDate.getTime() < currentDate.getTime() && user.remeberLoggedIn === false) {
      deleteLocalStorageForLoggedOutUser(user.id);
      logoutUser(user);
      updateCount(0);
    }
  }

  // Adds an event listener to detect when the browser or tab is closed, 
  // ensuring the user is automatically logged out if necessary.
  document.addEventListener('visibilitychange', () => {
    handleElegantUserLogout();
    if (document.visibilityState === 'hidden' && user !== false) {
      handleElegantUserLogout();
    }
  });

  if (!user && location.pathname !== '/login') {
    console.log('navigating outise', auth)
    return <Navigate to={'/login'}/>
  }

  return (
    <div className='app'>
      { children }
    </div>
  )
}

export default App;