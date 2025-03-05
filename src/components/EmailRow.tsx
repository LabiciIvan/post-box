import { Email, InboxTypeKeys } from '../types'

const EmailRow = ({email, onPickFileToRead, onDelete}: {email: Email, onPickFileToRead: (email: Email) => void, onDelete: (emailID: string) => void}) => {

  return (
    <div className='email-row'>
    <div className='email-header'>
      <strong className='email-title' onClick={() => onPickFileToRead(email)}>{email.title}</strong>
      <span className='email-timestamp'>
        {email.timestamp}
        <i className='bi bi-trash3-fill' onClick={() => onDelete(email.id)}/>
        </span>
    </div>
    <div className='email-snippet' onClick={() => onPickFileToRead(email)} >
      {email.message.substring(0, 50)}...
    </div>
  </div>
  )
}

export default EmailRow;