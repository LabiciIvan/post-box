import { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Email, CCType } from '../types';
import { insertEmailInLocalStorage } from '../tests/database-mock';
import { isValidEmail } from '../hooks/Utilities';
import EmailUserBadge from './EmailUserBadge';
import { ComposeContext } from '../context/ComposeContext';

const WriteFile = () => {

  const [edit, setEdit] = useState<boolean>(false);

  const [subject, setSubject] = useState<string>('');

  const [to, setTo] = useState<string>('');

  const [CC, setCC] = useState<string>('');

  const [listCC, setListCC] = useState<CCType[]>([]);

  const [invalidCCEmail, setInvalidCCEmail] = useState<boolean>(false);

  const [invalidToEmail, setInvalidToEmail] = useState<boolean>(false);

  const [toValueSet, setToValueSet] = useState<boolean>(false);

  const divRef = useRef<any>(null);

  const [emailMessage, setEmailMessage] = useState<string>('');

  const [emailSent, setEmailSent] = useState<boolean>(false);

  const auth = useContext(AuthContext);

  const composeTracking = useContext(ComposeContext);

  const { content, hasContent, doesntHaveContent, setEmail} = composeTracking;

  const {user} = auth;

  if (!user) return;

  const enableEdit = () => {
    if (edit) return;
    setEdit(() => true);
  }

  const typingMessage = (value: string): void => {
    setEmailMessage(() => value);

    const possibleDraft: Email = {
      id: '0',
      timestamp: new Date().toLocaleString(),
      cc: [...listCC],
      sender: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      receiver: [{
        email: to,
      }],
      title: subject,
      message: emailMessage.replace(/\n{3,}/g, (match) => "\n".repeat(match.length - 2)),
    }


    if (value.length > 0) {
      hasContent();
      setEmail(possibleDraft);
    } else {
      doesntHaveContent()
      setEmail(null);
    }
  }

  const handleToValue = (key: string): void => {
    if (to.length === 0 || key !== 'Enter') return;

    if (!isValidEmail(to)) {
      setInvalidToEmail(() => true);
      return;
    }

    setToValueSet(() => true);
    setInvalidToEmail(() => false);
  }

  const handleRemoveTo = (email: string): void => {
    setTo(() => '');
    setToValueSet(() => false);
  }

  const handleAddCCToList = (key:string): void => {

    if (CC.length === 0 || (key !== 'add-button' && key !== 'Enter')) return;

    if (!isValidEmail(CC)) {
      setInvalidCCEmail(() => true);
      return;
    }

    setInvalidCCEmail(() => false);

    const userCC: CCType = {
      email: CC
    };

    const exists:boolean = listCC.some((user:CCType) => user.email === userCC.email.trim());

    if (exists) return;

    setCC(() => '');

    setListCC(prev => [...prev, userCC]);
  }

  const handleRemoveCCFromList = (email: string): void => {
    const updatedList = listCC.filter(userCC => userCC.email !== email);
    setListCC(() => updatedList);
  }

  const sendEmail = () => {
    if (subject.trim().length === 0 || to.trim().length === 0) return;

    // const emailMessage: string = divRef.current.split('\n').map((row: string) => row === '' ? "\n" : row).join('\n');
    // const emailMessageFormatted: string = emailMessage.split('\n').map((row: string) => row === '' ? "\n" : row).join('\n');

    const email: Email = {
        id: '0',
        timestamp: new Date().toLocaleString(),
        cc: [...listCC],
        sender: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        receiver: [{
          email: to,
        }],
        title: subject,
        message: emailMessage.replace(/\n{3,}/g, (match) => "\n".repeat(match.length - 2)),
        // message: emailMessage,
    }

    insertEmailInLocalStorage(email, user.id, 'sent');
    doesntHaveContent();
    setEmail(null);
    setEmailSent(() => true);

    setCC(() => '');
    setTo(() => '');
    setToValueSet(() => false);
    setListCC(() => []);
    setSubject(() => '');
    divRef.current.innerHTML = "";

    setTimeout(() => {
      setEmailSent(() => false);
    }, 1500);
  }

  return (
    <>
      <div className={`write-file-header ${emailSent && 'email-sent'}`}>
        <div className='row-wrapper'>
          <label htmlFor='to'>To:</label>
          {
            toValueSet ? <EmailUserBadge user={{ email: to }} onRemoveUserBadge={handleRemoveTo}/> :
            <input className={`${invalidToEmail && 'invalid-to-email'}`} id='to' type='text' onChange={(e) => setTo(() => e.target.value)} onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleToValue(e.key)} />
          }
        </div>

        <div className='row-wrapper'>
          <label htmlFor='to'>CC:</label>
          <div className='cc-wrapper'>
              {listCC.length > 0 && listCC.map(userCC => <EmailUserBadge key={userCC.email} user={userCC} onRemoveUserBadge={handleRemoveCCFromList}/>)}
            <input className={`${invalidCCEmail && 'invalid-cc-email'}`} type='text' onChange={(e) => setCC(prev => e.target.value)} value={CC} autoFocus={true} onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleAddCCToList(e.key)}/>
          </div> 
          <button onClick={() => handleAddCCToList('add-button')}>Add</button>
        </div>

        <input type='text' placeholder='Subject:' onChange={(e) => setSubject(() => e.target.value)} value={subject} />
      </div>

      <div
        ref={divRef}
        className='write-file'
        contentEditable={edit}
        suppressContentEditableWarning={true}
        onClick={enableEdit}
        onInput={(e) => typingMessage((e.target as HTMLDivElement).innerText)}
      >
        {!edit && <div className='placeholderr'>Click here and start writing your email...</div>}
      </div>

      <div className='write-file-footer'>
        <div className='row-wrapper' onClick={sendEmail}>
          <i className='bi bi-send-fill' />
          <p>Send</p>
        </div>

        <div className='row-wrapper'>
          <i className='bi bi-paperclip' />
        </div>
      </div>
    </>
  )
}

export default WriteFile;