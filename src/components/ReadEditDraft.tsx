import { useContext, useRef, useState } from 'react';
import { CCType, Email } from '../types';
import { AuthContext } from '../context/AuthContext';
import { isValidEmail } from '../hooks/Utilities';
import { insertEmailInLocalStorage } from '../tests/database-mock';
import EmailUserBadge from './EmailUserBadge';


const ReadEditDraft = ({email, onClose} : {email: Email, onClose: () => void}) : React.ReactNode=> {

  console.log('email', email)

  const {receiver, message} = email;

  console.log('receiver', receiver)
  const [editTriggered, setEditTriggered] = useState<boolean>(false);

  const [emailMessage, setEmailMessage] = useState<string>(message);

  const [emailReceiver, setEmailReceiver] = useState<string>(receiver[0]['email']);

  const sendEmail = () => {

  }

  return (
    <div className='read-edit-draft'>

      <input type="text" placeholder='To' value={emailReceiver}/>

      <input type="text" placeholder='CC'/>

      <textarea className={`email-message ${editTriggered && 'edit'}`}>
        {emailMessage}
      </textarea>

      <button onClick={sendEmail}>SEND</button>
    </div>
  )
}

export default ReadEditDraft;