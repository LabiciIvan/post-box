import { CCType } from '../types';

const EmailUserBadge = ({user, onRemoveUserBadge}:{user:CCType, onRemoveUserBadge: (email: string) => void}): React.ReactNode => {

  return (
    <div className='email-user-badge' key={user.email}>
      {/* <img alt='cc-user-image' /> */}
      <div className='badge-image'>
        <i className='bi bi-person-fill' />
      </div>
      {user.email}
      <button onClick={() => onRemoveUserBadge(user.email)}>x</button>
    </div>
  )
}

export default EmailUserBadge;