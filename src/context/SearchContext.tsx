import { createContext, useState } from 'react';
import { Email, errorSearchType, InboxType } from '../types';



interface searchType {
  results: InboxType[],
  addResults: (emails: InboxType[])  => void,
  error: errorSearchType
  setError: (error: errorSearchType) => void
}

const SearchContext = createContext<searchType>({
  results: [{
    belongsTo: 0,
    inbox : [],
    draft : [],
    sent : [],
    deleted : [],
    results : [],
  }],
  addResults: (emails: InboxType[]) => {},
  error: {message: ''},
  setError: () => {}
});


const SearchProvider = ({children} : {children: React.ReactNode}): React.ReactNode => {

  const [results, setResults] = useState<InboxType[]>([{
    belongsTo: 0,
    inbox : [],
    draft : [],
    sent : [],
    deleted : [],
    results : [],
  }]);

  const [error, setError] = useState<errorSearchType>({message: ''});

  const addResults = (emails: InboxType[]): void => {
    setResults(() => emails);
  }

  return (
    <SearchContext.Provider value={{ results, error, addResults, setError }}>
      {children}
    </SearchContext.Provider>
  )
}

export default SearchProvider;

export {
  SearchContext
}