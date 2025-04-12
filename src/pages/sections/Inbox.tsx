import { useContext, useEffect, useState } from 'react';
import { deleteEmailFromALocalStorageCategory, fetchInbox, markInboxEmail } from '../../tests/database-mock';
import { AuthContext } from '../../context/AuthContext';
import { AuthContextType, Email, InboxType } from '../../types';
import EmailRow from '../../components/EmailRow';
import Loading from '../../components/Loading';
import ReadFile from '../../components/ReadFile';
import NotFound from '../../components/NotFound';
import UnreadEmailCountContext from '../../context/ReadEmailContext';

const Inbox = () => {

  const [inbox, setInbox] = useState<Email[]>([]);

  const [loading, setLoading] = useState<boolean>(true);

  const [readFile, setReadFile] = useState<Email|null>(null);

  const auth: AuthContextType|false = useContext(AuthContext);

  if (!auth || !auth.user) {
    return (
      <div>
        Error display the inbox
      </div>
    )
  }

  const { id } = auth.user;

  const unreadEmailsContext = useContext(UnreadEmailCountContext);

  const {updateCount} = unreadEmailsContext;

  const getInboxEmails = async(): Promise<void> => {
    try {
      const inboxData: InboxType = await fetchInbox(id);


      const unreadEmails = inboxData['inbox'].reduce((count, currentEmail) => count + (currentEmail.emailRead === false ? 1 : 0), 0);

      updateCount(unreadEmails);

      setInbox(() => inboxData.inbox);
    } catch (error) {
      console.log('function getInboxEmails() error:', error);
      setInbox(() => []);
    }

    setLoading(false);
  }

  useEffect(() => {
    getInboxEmails();
  }, []);

  const pickFileToRead = (email: Email): void => {
    setLoading(() => true);
    setReadFile(() => email);

    setTimeout(() => {
      setLoading(() => false);
    }, 1200);

    markInboxEmail(email.id, id, 'inbox', true);
  }

  const closeReadingFile = (): void => {
    setReadFile(() => null);
    getInboxEmails();
  }

  const handleDelete = (emailID: string) => {
    setLoading(() => true);
    deleteEmailFromALocalStorageCategory(id, emailID, 'inbox');
    getInboxEmails();
  }

  return (
    <div className='inbox-container'>
      {
        loading ? (
          <Loading text='Loading inbox emails...' />
        ) : (
          <div className='emails'>
            {readFile ? (
              <ReadFile email={readFile} onClose={closeReadingFile}/>
            ) : inbox.length > 0 ? (
              inbox.map((email) => (
                <EmailRow key={email.id} email={email} onPickFileToRead={pickFileToRead} onDelete={handleDelete} locationUsed='inbox' onHandleEmailMark={getInboxEmails}/>
              ))
            ) : <NotFound text='Your list is empty.' />}
          </div>
        )
      }
    </div>
  )
}

export default Inbox;