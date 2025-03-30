import { useContext, useState } from 'react';
import { Email, InboxTypeKeys, InboxTypeKeysString } from '../types'
import { markInboxEmail, moveInboxEmail } from '../tests/database-mock';
import { AuthContext } from '../context/AuthContext';
import UnreadEmailCountContext from '../context/ReadEmailContext';

const EmailRow = ({email, onPickFileToRead, onDelete, locationUsed, onHandleEmailMark}: {email: Email, onPickFileToRead: (email: Email) => void, onDelete: (emailID: string) => void, locationUsed: keyof InboxTypeKeys, onHandleEmailMark: () => void}) => {

  const [showMoreMenu, setShowMoreMenu] = useState<boolean>(false);

  const auth = useContext(AuthContext);

  const {user} = auth;

  if (!user) return;

  const unreadEmailsContext = useContext(UnreadEmailCountContext);

  const {unreadCount, updateCount} = unreadEmailsContext;

  const handleCallParentComponentRefresh = (emailID: string, emailRead: boolean): void => {
    markInboxEmail(emailID, user.id, locationUsed, emailRead);
    onHandleEmailMark();
  }

  const handleParentRefreshForEmailMove = (emailID: string, userID: number, destination: InboxTypeKeysString): void => {
    moveInboxEmail(emailID, userID, locationUsed, destination);
    onHandleEmailMark();

    if (destination === 'inbox') {
      updateCount(unreadCount + 1);
    }
  }

  const availableSections: InboxTypeKeysString[] = ['inbox', 'sent', 'draft', 'deleted'];

  return (
    <div className={`email-row ${email.emailRead === false && 'unread-email'}`}>
    <div className='email-header'>
      <strong className={`email-title ${email.emailRead === false && 'unread-email'}`} onClick={() => onPickFileToRead(email)}>{email.title}</strong>
      <div className='email-controls'>
        <div className='email-more'>
          <i className='bi bi-three-dots-vertical' onClick={() => setShowMoreMenu(() => true)} />
          {
            showMoreMenu &&
            <div className='more-menu' onMouseLeave={() => setShowMoreMenu(() => false)}>
              <div className='menu-move'>
                <span className='move-to-direction'>Move to</span>
                <div>
                {
                  availableSections.map(item => (item !== locationUsed) &&
                  <span key={item} onClick={() => handleParentRefreshForEmailMove(email.id, user.id, item)}>{item}</span>)
                }
                </div>
              </div>
              <span onClick={() => handleCallParentComponentRefresh(email.id, !email.emailRead)}>Mark as <span className='span-read-unread'>{email.emailRead === true ? 'unread' : 'read'}</span></span>
              <span className='span-delete' onClick={() => onDelete(email.id)}>Delete</span>
            </div>
          }
        </div>
        <span className='email-timestamp'>
          {email.timestamp}
          <i className='bi bi-trash3-fill' onClick={() => onDelete(email.id)}/>
        </span>
      </div>

    </div>
    <div className={`email-snippet ${email.emailRead === false && 'unread-email'}`} onClick={() => onPickFileToRead(email)} >
      {email.message.substring(0, 50)}...
    </div>
  </div>
  )
}

export default EmailRow;