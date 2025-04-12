import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Email, InboxType } from '../../types';
import { deleteEmailFromALocalStorageCategory, fetchInbox } from '../../tests/database-mock';
import EmailRow from '../../components/EmailRow';
import Loading from '../../components/Loading';
import ReadWriteEmail from '../../components/ReadWriteEmail';
import NotFound from '../../components/NotFound';

const Draft = () => {

  const [draft, setDraft] = useState<Email[]>([]);

  const [readFile, setReadFile] = useState<Email|null>(null);

  const [loading, setLoading] = useState<boolean>(true);

  const auth = useContext(AuthContext);

  if (!auth.user) return;

  const {user} = auth;

  const getDraftEmails = async(): Promise<void> => {
    try {
      const inboxData: InboxType = await fetchInbox(user.id);

      setDraft(() => inboxData.draft);
    } catch(error) {
      console.log('function getDraftEmails() error:', error);
      setDraft(() => []);
    }

    setLoading(false);
  }

  useEffect(() => {
    getDraftEmails();
  }, []);

  const pickFileToRead = (email: Email): void => {
    setLoading(() => true);
    setReadFile(() => email);

    setTimeout(() => {
      setLoading(() => false);
    }, 1200);
  }

  const closeReadingFile = () => {
    setReadFile(() => null);
  }

  const handleDelete = (emailID: string) => {
    setLoading(() => true);
    deleteEmailFromALocalStorageCategory(user.id, emailID, 'draft');
    getDraftEmails();
  }

  return (
    <div className='draft-container'>
      {
        loading ? (
          <Loading text='Loading draft emails...'/> 
        ) : (
          <div className='emails'>
            {
              readFile ? (
                <ReadWriteEmail email={readFile} composeOrDraft='draft'/>
              ) : (
                draft.length > 0 ? (
                  draft.map((email) => 
                    <EmailRow key={email.id} email={email} onPickFileToRead={pickFileToRead} onDelete={handleDelete} locationUsed='draft' onHandleEmailMark={getDraftEmails}/>
                  )
                ) : (
                  <NotFound text='Your list is empty.' />
                )
              )
            }
          </div>
        )
      }
    </div>
  )
}

export default Draft;