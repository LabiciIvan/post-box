import { useContext, useEffect, useState } from "react";
import { Email, InboxType } from "../../types";
import { deleteEmailFromALocalStorageCategory, fetchInbox } from "../../tests/database-mock";
import { AuthContext } from "../../context/AuthContext";
import EmailRow from "../../components/EmailRow";
import Loading from "../../components/Loading";
import ReadFile from "../../components/ReadFile";
import NotFound from "../../components/NotFound";

const Sent = () => {

  const [sent, setSent] = useState<Email[]>([]);

  const [readFile, setReadFile] = useState<Email|null>(null);

  const [loading, setLoading] = useState<boolean>(true);

  const auth = useContext(AuthContext);

  if (!auth.user) return;

  const {user} = auth;

  const getSentEmails = async(): Promise<void> => {

    try {
      const inboxData: InboxType = await fetchInbox(user.id);

      setSent(() => inboxData.sent);
    } catch (error) {
      console.log('function getSentEmails() error:', error);
      setSent(() => []);
    }
    setLoading(false);
  }

  useEffect(() => {
    getSentEmails();
  }, []);

  const pickFileToRead = (email: Email): void => {
    setLoading(() => true);
    setReadFile(() => email);

    setTimeout(() => {
      setLoading(() => false);
    }, 1200);

    console.log('email', email);
    console.log('readFile', readFile);
  }

  const closeReadingFile = () => {
    setReadFile(() => null);
  }

  const handleDelete = (emailID: string) => {
    setLoading(() => true);
    deleteEmailFromALocalStorageCategory(user.id, emailID, 'sent');
    getSentEmails();
  }

  return (
    <div className='sent-container'>
      {
        loading ?
        <Loading text='Loading sent emails...'/>
        : (
          <div className='emails'>
            {readFile ? (
              <ReadFile email={readFile} onClose={closeReadingFile}/>
            ) : sent.length > 0 ?
              sent.map(email => 
              <EmailRow key={email.id} email={email} onPickFileToRead={pickFileToRead} onDelete={handleDelete} locationUsed="sent" onHandleEmailMark={getSentEmails}/>
            ): 
            <NotFound text='Your list is empty.' />}
          </div>
        )
      }

    </div>
  )
}

export default Sent;

