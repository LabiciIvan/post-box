import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getEmailFromLocalStorage } from '../tests/database-mock';
import { errorSearchType, InboxType } from '../types';
import { SearchContext } from '../context/SearchContext';
import { ViewSectionContext } from '../context/ViewSectionContext';

const SearchEmails = (): React.ReactNode => {

  const [query, setQuery] = useState<string>('');


  // Authenticated user context
  const auth = useContext(AuthContext);

  const { user } = auth;

  if (!user) return;

  // Search context
  const search = useContext(SearchContext);

  const { addResults, setError } = search;

  // ViewSection context
  const view = useContext(ViewSectionContext);

  const { selectView } = view;


  const clearInput = (): void => {
    setQuery(() => '');
  }


  const searchUsingQuery = (key: string|null): void => {
    console.log('key', key);
    if (query.length === 0 || (key !== null && key !== 'Enter')) return;
    console.log('searc');

    const searchResults: InboxType[] = [{
      belongsTo: user.id,
      inbox : [],
      draft : [],
      sent : [],
      deleted : [],
      results : [],
    }];

    let foundResults: boolean = false;

    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const words = escapedQuery.split(/\s+/).filter(Boolean);

    const regex = new RegExp(words.map(word => `(?=.*\\b${word}\\b)`).join(""), "i");

    const allEmails: InboxType[] = getEmailFromLocalStorage(user.id);

    console.log('allEmails', allEmails);


    const { inbox, draft, sent, deleted } = allEmails[0];

    inbox.forEach(i => {
      if (i.title.length > 0 && regex.test(i.title)) {
        searchResults[0]['inbox'].push(i);
        foundResults = true;
      }
    });
  
    draft.forEach(i => {
      if (i.title.length > 0 && regex.test(i.title)) {
        searchResults[0]['draft'].push(i);
        foundResults = true;
      }
    });
  
    sent.forEach(i => {
      if (i.title.length > 0 && regex.test(i.title)) {
        searchResults[0]['sent'].push(i);
        foundResults = true;
      }
    });
  
    deleted.forEach(i => {
      if (i.title.length > 0 && regex.test(i.title)) {
        searchResults[0]['deleted'].push(i);
        foundResults = true;
      }
    });

    let error: errorSearchType = {
      message: ''
    }

    let results = [{
      belongsTo: 0,
      inbox : [],
      draft : [],
      sent : [],
      deleted : [],
      results : [],
    }]

    if (foundResults) {
      addResults(searchResults);
      setError(error);
    } else {
      error.message = 'No results found';
      setError(error);
      addResults(results);
    }

    selectView('results');
  }


  return (
    <div className='search-emails'>
      <div className='search' onClick={() => searchUsingQuery(null)}>
        <i className='bi bi-search' />
      </div>
      <input
        type='text'
        value={query}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(() => e.target.value)}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => searchUsingQuery(e.key)}
        />
      <div className='close' onClick={clearInput}>
        <i className='bi bi-x-lg' />
      </div>
    </div>
  )
}

export default SearchEmails;