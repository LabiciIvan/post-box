import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Email, InboxType } from '../../types';
import { deleteEmailFromALocalStorageCategory, fetchInbox } from '../../tests/database-mock';
import Loading from '../../components/Loading';
import EmailRow from '../../components/EmailRow';
import ReadFile from '../../components/ReadFile';
import NotFound from '../../components/NotFound';

const Delete = () => {

  const [deleted, setDelete] = useState<Email[]>([]);

  const [readFile, setReadFile] = useState<Email|null>(null);

  const [loading, setLoading] = useState<boolean>(true);

  const [enableDeleteOverlay, setEnableDeleteOverlay] = useState<boolean>(false);

  const auth = useContext(AuthContext);

  if (!auth.user) return;

  const {user} = auth;

  const getDeleteEmails = async(): Promise<void> => {
    try {
      const inboxData: InboxType = await fetchInbox(user.id);

      setDelete(() => inboxData['deleted']);
    } catch(error) {
      console.log('function getDeleteEmails() error:', error);
      setDelete(() => []);
    }

    setLoading(false);
  }

  useEffect(() => {
    getDeleteEmails();
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

  const handleConfirmButtonsAction = (decision: 'YES'|'CANCEL', emailID: string): void => {
    if (decision === 'YES') {
      handleDelete(emailID, 'YES');
      return;
    }

    setEnableDeleteOverlay(() => false);
  }

  const handleDelete = (emailID: string, decision?: 'YES'|'CANCEL'): void => {
    // Enable overlay as decision parameter is option.
    if (decision === undefined) {
      setEnableDeleteOverlay(() => true);
      return;
    }

    // Reset all state for the overlay div
    setEnableDeleteOverlay(() => false);

    setLoading(() => true);
    deleteEmailFromALocalStorageCategory(user.id, emailID, 'deleted');
    getDeleteEmails();
  }


  return (
    <div className='deleted-container'>
      {
        loading ? (
          <Loading text='Loading deleted emails...'/>
        ) : (
        <div className='emails'>
        {readFile ? (
          <ReadFile email={readFile} onClose={closeReadingFile}/>
        ) : deleted.length > 0 ?(
          deleted.map((email) => 
            <>
              {
                enableDeleteOverlay &&
                <div className='deleted-overlay'>
                <div className='box'>
                  <div className='message'>
                    <span>Are you sure you want to delete it ?</span>
                    <span>Once deleted from the 'Delete' section it can't be recovered.</span>
                  </div>
                  <div className='actions'>
                    <div className='button' onClick={() => handleConfirmButtonsAction('YES', email.id)}>Yes</div>
                    <div className='button' onClick={() => handleConfirmButtonsAction('CANCEL', email.id)}>Cancel</div>
                  </div>
                </div>
              </div>
              }
            <EmailRow key={email.id} email={email} onPickFileToRead={pickFileToRead} onDelete={handleDelete} locationUsed='deleted' onHandleEmailMark={getDeleteEmails}/>
            </>
          ))
          : <NotFound text='Your list is empty.' />
        }
      </div>
      )
      }
    </div>
  )
}

export default Delete;
