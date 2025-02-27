import { useContext } from 'react';
import { logoutUser } from './hooks/Auth';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

const App = ({children} : {children: React.ReactNode}) => {

  const auth = useContext(AuthContext);

  const { user } = auth;

  if (!user) {
    return <Navigate to={'/login'}/>
  }

  return (
    <div className='app'>
      { children }
    </div>
  )
}

export default App;