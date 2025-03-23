import { Email } from '../types'

const ReadFile = ({email, onClose}: {email: Email, onClose: () => void}): React.ReactNode => {
  
  const formattedMessage = email.message.split('\n').join('<br>');
  console.log('ReadFile:', email);
  
  return (
    <div className='read-file-container'>
      <i className='bi bi-arrow-left' onClick={onClose} />
      <div className='email-header'>
        <h1 className='email-title'>{email.title}</h1>
        <div className='email-metadata'>
          <div className='sender-info'>
            <span className='sender-name'>{email.sender.name}</span>
            <span className='sender-email'>{`<${email.sender.email}>`}</span>
          </div>
          <div className='receiver-info'>
            <span className='receiver-label'>To:</span>
            {email.receiver &&
              email.receiver.map((receiver) => (
                <span key={receiver.email} className='receiver-email'>
                  {receiver.email}
                </span>
              ))}
          </div>
          {email.cc.length > 0 && (
            <div className='cc-info'>
              <span className='cc-label'>Cc:</span>
              {email.cc.map((cc) => (
                <span key={cc.email} className='cc-email'>
                  {cc.email}
                </span>
              ))}
            </div>
          )}
          <div className='email-timestamp'>{email.timestamp}</div>
        </div>
      </div>
      <div className='email-body'>
        <p className={`email-message ${email.fontType} font-${email.fontSize}`} dangerouslySetInnerHTML={{ __html: formattedMessage }} />
      </div>
    </div>
  );
};


export default ReadFile; // 787