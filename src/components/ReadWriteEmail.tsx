import { useContext, useState } from 'react';
import { CCType, Email, MailUser } from '../types';
import { AuthContext } from '../context/AuthContext';
import { ComposeContext } from '../context/ComposeContext';
import { ViewSectionContext } from '../context/ViewSectionContext';
import { deleteEmailFromALocalStorageCategory, insertEmailInLocalStorage } from '../tests/database-mock';
import { isValidEmail } from '../hooks/Utilities';
import EmailUserBadge from './EmailUserBadge';

const ReadWriteEmail = ({email}:{email: Email}): React.ReactNode => {

  const {id, cc, sender, receiver, title, message } = email;

  const [ccList, setCCList] = useState<CCType[]>(cc);

  const [ccEmail, setCCEmail] = useState<string>('');

  const [ccEmailError, setCCEmailError] = useState<boolean>(false);

  const [senderEmail, setSenderEmail] = useState<MailUser>(sender);

  const [receiverEmail, setReceiverEmail] = useState<CCType[]>(receiver);

  const [showReceiverBadge, setShowReceiverBadge] = useState<boolean>(false);

  const [receiverEmailError, setReceiverEmailError] = useState<boolean>(false);

  const [titleEmail, setTitleEmail] = useState<string>(title);

  const [messageEmail, setMessageEmail] = useState<string>(message);


  // Context for authenticated user
  const auth = useContext(AuthContext);

  const { user } = auth;

  // Context for tracking a possible draft
  const compose = useContext(ComposeContext);

  const {content, hasContent, doesntHaveContent, setEmail} = compose;

  // Context for tracking current view
  const view = useContext(ViewSectionContext);

  const {title : viewTitle, selectView} = view;


  // Composed email template
  let composedDraftEmail: Email = {
    id: id,
    timestamp: new Date().toLocaleString(),
    cc: [...ccList],
    sender: {
      id: (!user ? 0 : user.id),
      name: (!user ? '' : user.name),
      email: (!user ? '' : user.email),
    },
    receiver: [{
      email: receiverEmail[0]['email'],
    }],
    title: titleEmail,
    message: messageEmail,
  }


  // Adds a user to the CC list
  const handleCCEmail = (key: string) => {

    if (key !== 'Enter') return;

    if (!isValidEmail(ccEmail)) {
      setCCEmailError(() => true);
      return;
    }

    setCCEmailError(() => false);

    const userCC: CCType = {
      email: ccEmail
    };

    const exists:boolean = ccList.some((user:CCType) => user.email === userCC.email.trim());

    if (exists) return;

    setCCEmail(() => '');
    setCCList(previousList => [...previousList, userCC]);
  }

  const handleRemoveEmailFromCCList = (toRemove: string): void => {
    const updatedCCList = ccList.filter(ccEmail => ccEmail.email !== toRemove);

    setCCList(() => updatedCCList);
  }


  const handleReceiverEmail = (key: string): void => {
    if (key !== 'Enter') return;

    if (!isValidEmail(receiverEmail[0]['email'])) {
      setReceiverEmailError(() => true);
      return;
    }

    setReceiverEmailError(() => false);
    setShowReceiverBadge(() => true);
  }

  const handleRemoveReceiver = (email: string): void => {
    setShowReceiverBadge(() => false);
    setReceiverEmail(() => [{email: ''}]);
  }


  const handleTitleEmail = (titleInput: string) => {
    setTitleEmail(() => titleInput);

    composedDraftEmail = {...composedDraftEmail,
      cc: [...ccList],
      receiver: [{ email: receiverEmail[0]['email']}],
      title: titleEmail,
      message: messageEmail,
    };

    if (titleInput.length > 0 || (titleInput.length === 0 && messageEmail.length > 0)) {
      // Update the message of composed email.
      hasContent();
      setEmail(composedDraftEmail);
    } else {
      doesntHaveContent();
      setEmail(null);
    }
  }


  const handleMessageEmail = (messageInput: string) => {
    setMessageEmail(() => messageInput);

    composedDraftEmail = {...composedDraftEmail,
      cc: [...ccList],
      receiver: [{ email: receiverEmail[0]['email']}],
      title: titleEmail,
      message: messageEmail,
    };

    if (messageInput.length > 0 || (messageInput.length === 0 && titleEmail.length > 0)) {
      // Update the message of composed email.
      hasContent();
      setEmail(composedDraftEmail);
    } else if (messageInput.length === 0) {
      doesntHaveContent();
      setEmail(null);
    }
  }


  const handleSendEmail = (): void => {
    // Can't send email without receiver, title and message
    if (receiverEmail[0]['email'].length === 0 || titleEmail.length === 0 || messageEmail.length === 0) return;

    const composedEmail: Email = {
      id: id,
      timestamp: new Date().toLocaleString(),
      cc: [...ccList],
      sender: {
        id: (!user ? 0 : user.id),
        name: (!user ? '' : user.name),
        email: (!user ? '' : user.email),
      },
      receiver: [{
        email: receiverEmail[0]['email'],
      }],
      title: titleEmail,
      message: messageEmail,
    }

    insertEmailInLocalStorage(composedEmail, (!user ? 0 : user.id), 'sent');

    // Clean all state if composed email is not from a draft
    if (viewTitle !== 'draft') {
      setCCList(() => []);
      setCCEmail(() => '');
      setReceiverEmail(() => [{email: ''}]);
      setTitleEmail(() => '');
      setMessageEmail(() => '');
    } else {
      // Email sent is from draft therefore we switch view to 'sent' emails
      deleteEmailFromALocalStorageCategory((!user ? 0 : user.id), composedEmail.id, 'draft');
      selectView('sent');
    }

    doesntHaveContent();
    setEmail(null);
  }


  return (
    <div className='read-write-email'>

      <div className='read-write-section'>
        <p>TO:</p>
        <div className='input-wrapper'>
          {
            showReceiverBadge ? 
            <EmailUserBadge user={receiverEmail[0]} onRemoveUserBadge={handleRemoveReceiver}/>
            :
            <input
            type='text'
            className={` ${receiverEmailError && 'error'}`}
            value={receiverEmail[0]['email']}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setReceiverEmail(previousReceiver => [{email: e.target.value}])} 
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleReceiverEmail(e.key)}
          />
          }
        </div>
      </div>

      <div className='read-write-section'>
        <p>CC:</p>
        <div className='input-wrapper'>
          {
            // ccList.length > 0 && ccList.map(ccEmail => <div key={ccEmail.email}>{ccEmail.email}</div>)
            ccList.length > 0 && ccList.map(ccEmail => <EmailUserBadge user={ccEmail} onRemoveUserBadge={handleRemoveEmailFromCCList}/>)
          }
          <input
            type='text'
            className={` ${ccEmailError && 'error'}`}
            value={ccEmail}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCCEmail(() => e.target.value)} 
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleCCEmail(e.key)}
          />
        </div>
      </div>

      <div className='read-write-section'>
        <div className='input-wrapper'>
          <input
            type='text'
            placeholder='Email title...'
            value={titleEmail}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleTitleEmail(e.target.value)} 
          />
        </div>
      </div>

      <div className='read-write-section'>
        <div className='input-wrapper'>
          <textarea
            value={messageEmail}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleMessageEmail(e.target.value)} 
          />
        </div>
      </div>
      
      <div className='footer'>
        <button onClick={handleSendEmail}>Send</button>
      </div>
    </div>
  )
}

export default ReadWriteEmail;