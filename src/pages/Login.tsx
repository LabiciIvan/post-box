import { useContext, useEffect, useState } from 'react';
import { ProfileInterface, User } from '../types';
import { Navigate } from 'react-router-dom';
import { fetchInbox, fetchProfile, fetchUser, getEmailFromLocalStorage, syncApplicationLocalStorage } from '../tests/database-mock';
import { loginUser } from '../hooks/Auth';
import { AuthContext } from '../context/AuthContext';
import Loading from '../components/Loading';
import { LoginContext } from '../context/LoginContext';
import UnreadEmailCountContext from '../context/ReadEmailContext';

const Login = (): any => {

  const auth = useContext(AuthContext);

  const {user, login, logout} = auth;

    if (user) {
    return <Navigate to={'/'}/>
  }

  const loginContext = useContext(LoginContext);

  const {emailLogin, passwordLogin, handleEmail, handlePassword} = loginContext;

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [keepLogged, setKeepLogged] = useState<boolean>(false);

  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(false);

  const unreadEmailsContext = useContext(UnreadEmailCountContext);

  const {updateCount} = unreadEmailsContext;

  useEffect(() => {

    setEmail(() => emailLogin);
    setPassword(() => passwordLogin);

  }, [emailLogin, passwordLogin]);

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    setLoading(() => true);
    e.preventDefault();

    setEmail(() => '');
    setPassword(() => '');

    // Reset Login Context
    handleEmail('');
    handlePassword('');

    try {
      // Simulate a request from server to fetch user.
      let user: User | false = await fetchUser(email, password);

      let userProfile: ProfileInterface = await fetchProfile(user.id);

      if (keepLogged) {
        user = {...user, remeberLoggedIn: keepLogged}
      }

      let logoutAfterObj = new Date();

      logoutAfterObj.setHours(logoutAfterObj.getHours() + 1);

      user = {...user, logoutAfter: logoutAfterObj.toLocaleString()};

      const isLoggedIn: boolean = loginUser(user, userProfile);

      if (isLoggedIn) {
        // Used only in development mode.

        setLoading(() => false);
        login(user);
        syncApplicationLocalStorage(user.id);

        const emails = getEmailFromLocalStorage(user.id)[0];

        const unreadEmails = emails['inbox'].reduce((count, currentEmail) => count + (currentEmail.emailRead === false ? 1 : 0), 0);

        updateCount(unreadEmails);
      }

    } catch (error: any) {
      // Handle errors from mock of API.
      setLoading(() => false);
      setEmailError(() => error.email);
      setPasswordError(() => error.password);
      updateCount(0);
    }
  }

  return (
    <div className='login-page'>
      {
        loading ?
        <Loading text={'Log in...'}/>
        :
        <div className='login-section'>
          <div className='login-header'>
            <h2>Post Box</h2>
            <small>Sign in to your account</small>
          </div>
          <div className='login-body'>
            <form className='login-form' onSubmit={(e) => handleSubmitForm(e)}>
              <div className='content-wrapper'>
                <input className={`input ${emailError && 'error'}`} type='text'onChange={(e) => setEmail(() => e.target.value)} value={email} placeholder='Email'/>
                {
                  emailError && <strong className='error'>{emailError}</strong>
                }
              </div>

              <div className='content-wrapper'>
                <input className={`input ${passwordError && 'error'}`} type='password' onChange={(e) => setPassword(() => e.target.value)} value={password}  placeholder='Password'/>
                {
                  passwordError && <strong className='error'>{passwordError}</strong>
                }
              </div>

              <div className='content-wrapper --ROW'>
                <input type='checkbox' checked={keepLogged} onChange={() => setKeepLogged(prev => !prev)}/>
                <small onClick={() => setKeepLogged(prev => !prev)}>Keep me logged in</small>
              </div>

              <button className='btn' type='submit'>Login</button>
            </form>
          </div>
        </div>
      }

    </div>
  )
}

export default Login;