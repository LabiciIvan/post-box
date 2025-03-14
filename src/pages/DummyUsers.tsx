import { useContext, useState } from 'react';
import { users } from '../tests/data';
import { User } from '../types';
import { LoginContext } from '../context/LoginContext';

const DummyUsers = (): React.ReactNode => {

  const [extend, setExtend] = useState<boolean>(false);

  const [accountSelected, setAccountSelected] = useState<string>('');

  // Login Context
  const loginContext = useContext(LoginContext);

  const {handleEmail, handlePassword} = loginContext;

  const extendOrCollapseArea = (): void => {
    setExtend(prev => !prev);
  }

  const pickCertainUserToLogIn = (user: User) => {

    if (user.email === accountSelected) {
      setAccountSelected('');
      handleEmail('');
      handlePassword('');
      return;
    }

    setAccountSelected(() => user.email);
    handleEmail(user.email);
    handlePassword(user.password);
  }

  return (
    <div className={`dummy-users ${extend && 'extended'}`}>
      {extend &&
        users.map(user =>
          <div className={`user ${accountSelected === user.email && 'highlight'}`} onClick={() => pickCertainUserToLogIn(user)}>
            <div className='bracket-json'>{`{`}</div>
            <div className='content-json'>
              <div className='key'>email:</div>
              <div className='value'>{ user.email },</div>
            </div>
            <div className='content-json'>
              <div className='key'>password:</div>
              <div className='value'>'{ user.password }',</div>
            </div>
            <div className='bracket-json'>{`}`}</div>
          </div>
        )
      }
      {
        <div className='extend-collapse-button' onClick={extendOrCollapseArea}>
          <i className={`bi bi-arrow-${extend ? 'left' : 'right'}-square-fill`} />
        </div>
      }
    </div>
  )
}

export default DummyUsers;