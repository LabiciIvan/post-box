import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import Logout from './Logout';
import { useNavigate } from 'react-router-dom';

const UserBadge = (): React.ReactNode => {

  const [expandProfile, setExpandProfile] = useState<boolean>(false);

  const [expandDropDown, setExpandDropDown] = useState<boolean>(false);

  const auth = useContext(AuthContext);

  if (!auth.user) return;

  const { user } = auth;

  const navigate = useNavigate();

  const navigateToProfilePage = () => {
    return navigate('/profile');
  }

  return (
    <div className='user-badge'>
      <div
        className='badge-wrapper'
        onMouseEnter={() => setExpandProfile(() => true)}
        onMouseLeave={() => setExpandProfile(() => false)}
      >
        <span className={expandProfile ? 'expand' : 'collapse'}>{user.name}</span>
        <img className={expandProfile ? 'expand' : ''} src={user.image} />
      </div>
      <div
        className={`drop-down-wrapper ${expandProfile ? 'expand' : 'collapse'}`}
        onMouseEnter={() => setExpandProfile(() => true)}
        onMouseLeave={() => setExpandProfile(() => false)}
        >
        <div className='badge-section'>
          <h4 className='title'>Account</h4>
          <span>{user.name}</span>
          <span>{user.email}</span>
        </div>

        <div className='badge-section'>
          <h4 className='title -single-element'>Manage Account</h4>
        </div>

        <div className='badge-section'>
          <h4 className='title -single-element'>Settings</h4>
        </div>

        <div className='badge-section'>
          <h4 className='title -single-element' onClick={() => navigateToProfilePage()}>Profile</h4>
        </div>

        <div className='badge-section'>
          <h4 className='title -single-element'>
            <Logout />
          </h4>
        </div>

      </div>
    </div>
  )
}

export default UserBadge;