import { useContext, useState } from 'react';
import { SearchContext } from '../context/SearchContext';
import { Email } from '../types';
import ReadFile from '../components/ReadFile';
import EmailRow from '../components/EmailRow';
import NotFound from '../components/NotFound';

const Results = (): React.ReactNode => {

  const [readFile, setReadFile] = useState<Email|null>(null);

  // Search context
  const search = useContext(SearchContext);

  const { results, error } = search;

  const { inbox, draft, sent, deleted } = results[0];

  const closeReadingFile = () => {
    setReadFile(() => null);
  }

  return (
    <div className='results-page'>
      {
        (readFile !== null) && <ReadFile email={readFile} onClose={closeReadingFile}/>
      }

      {
        // error.message.length > 0 && <div className='search-results-error'>{error.message}</div>
        error.message.length > 0 && <NotFound text={error.message}/>
      }

      {
        (inbox.length > 0) &&
        <div className='result-section'>
          <div className='title'>Inbox results</div>
          <div className='content'>
            {
              inbox.map(email => 
                <EmailRow key={email.id} email={email} onPickFileToRead={setReadFile} onDelete={() => console.log('inbox delete')} locationUsed='inbox' onHandleEmailMark={closeReadingFile}/>
              )
            }
          </div>
        </div>
      }

      {
        (draft.length > 0) &&
        <div className='result-section'>
          <div className='title'>Draft results</div>
          <div className='content'>
            {
              draft.map(email => 
                <EmailRow key={email.id} email={email} onPickFileToRead={setReadFile} onDelete={() => console.log('draft delete')} locationUsed='draft' onHandleEmailMark={closeReadingFile}/>
              )
            }
          </div>
        </div>
      }

      {
        (sent.length > 0) &&
        <div className='result-section'>
          <div className='title'>Sent results</div>
          <div className='content'>
            {
              sent.map(email => 
                <EmailRow key={email.id} email={email} onPickFileToRead={setReadFile} onDelete={() => console.log('sent delete')} locationUsed='sent' onHandleEmailMark={closeReadingFile}/>
              )
            }
          </div>
        </div>
      }

      {
        (deleted.length > 0) &&
        <div className='result-section'>
          <div className='title'>Deleted results</div>
          <div className='content'>
            {
              deleted.map(email => 
                <EmailRow key={email.id} email={email} onPickFileToRead={setReadFile} onDelete={() => console.log('delete delete')} locationUsed='deleted' onHandleEmailMark={closeReadingFile}/>
              )
            }
          </div>
        </div>
      }
    </div>
  )
}

export default Results;