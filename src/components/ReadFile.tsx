import { Email } from '../types'
import { useState } from 'react';

const ReadFile = ({email, onClose}: {email: Email, onClose: () => void}): React.ReactNode => {
  
  const [fillArchive, setFillArchive] = useState<boolean>(false);
  const [fillTrash, setFillTrash] = useState<boolean>(false);
  const [fillStar, setFillStar] = useState<boolean>(false);

  const formattedMessage = email.message.split('\n').join('<br>');

  const date = new Date(email.timestamp);

  const emailTimestamp = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }).format(date);
  
  return (
    <div className='read-file-container'>
      <div className='email-header'>

        <div className='commands'>
          <div className='action'>
            <i className='bi bi-arrow-left' onClick={onClose} />
          </div>
          
          <div className='action' onMouseEnter={() => setFillTrash(() => true)} onMouseLeave={() => setFillTrash(() => false)}>
            {fillTrash ? <i className='bi bi-trash-fill' /> : <i className='bi bi-trash' />}
          </div>

          <div className='action' onMouseEnter={() => setFillArchive(() => true)} onMouseLeave={() => setFillArchive(() => false)}>
            {fillArchive ? <i className='bi bi-archive-fill' /> : <i className='bi bi-archive' />}
          </div>

          <div className='action' onMouseEnter={() => setFillStar(() => true)} onMouseLeave={() => setFillStar(() => false)}>
            {fillStar ? <i className='bi bi-star-fill'/> : <i className='bi bi-star' />}
          </div>
        </div>

        <h1 className='email-title'>{email.title}</h1>

        <div className='sender-info'>
          <small className='from'>From:</small>
          <span className='sender-email'>{email.sender.email}</span>
        </div>

          {/* <div className='receiver-info'>
            <span className='receiver-label'>To:</span>
            {email.receiver &&
              email.receiver.map((receiver) => (
                <span key={receiver.email} className='receiver-email'>
                  {receiver.email}
                </span>
              ))}
          </div> */}

        {email.cc.length > 0 && (
          <div className='cc-info'>
            <small className='cc'>Cc:</small>
            <div className="cc-list">
              {email.cc.map((cc, index) => (
                <span key={cc.email} className='cc-email'>
                  {cc.email}{index + 1 === email.cc.length ? '' : ','}
                </span>
              ))}
            </div>
          </div>
        )}
        <div className='email-timestamp'>{emailTimestamp}</div>
      </div>
      <div className='email-body'>
        <p className={`email-message ${email.fontType} font-${email.fontSize}`} dangerouslySetInnerHTML={{ __html: formattedMessage }} />
      </div>
    </div>
  );
};


export default ReadFile; // 787