import { useContext, useState } from 'react';
import { User } from '../types';
import { Navigate } from 'react-router-dom';
import { fetchUser, syncApplicationLocalStorage } from '../tests/database-mock';
import { loginUser } from '../hooks/Auth';
import { AuthContext } from '../context/AuthContext';
import Loading from '../components/Loading';

const Login = (): any => {

  const auth = useContext(AuthContext);

  const {user, login, logout} = auth;

    if (user) {
    return <Navigate to={'/'}/>
  }

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [keepLogged, setKeepLogged] = useState<boolean>(false);

  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    setLoading(() => true);
    e.preventDefault();

    setEmail(() => '');
    setPassword(() => '');

    try {
      // Simulate a request from server to fetch user.
      const user: User | false = await fetchUser(email, password);

      const isLoggedIn: boolean = loginUser(user);

      if (isLoggedIn) {
        // Used only in development mode.
        
        setLoading(() => false);
        login(user);
        syncApplicationLocalStorage(user.id);
      }

    } catch (error: any) {
      // Handle errors from mock of API.
      setLoading(() => false);
      setEmailError(() => error.email);
      setPasswordError(() => error.password);
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
                <input type='checkbox'  onClick={() => setKeepLogged(prev => !prev)} checked={keepLogged}/>
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