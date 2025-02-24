import { createContext, useState } from 'react';
import { Email } from '../types';


interface ComposeContentType {
  content: boolean,
  emailContent: Email|null,
  hasContent: () => void,
  doesntHaveContent: () => void,
  setEmail: (email: Email|null) => void
}

const ComposeContext = createContext<ComposeContentType>({
  content: false,
  emailContent: null,
  hasContent: () => {},
  doesntHaveContent: () => {},
  setEmail: (email: Email|null) => {},
});

const ComposeProvider = ({children}:{children: React.ReactNode}): React.ReactNode => {

  const [content, setContent] = useState<boolean>(false);
  const [emailContent, setEmailContent] = useState<Email|null>(null);

  const hasContent = () => {
    setContent(() => true);
  }

  const doesntHaveContent = () => {
    setContent(() => false);
  }

  const setEmail = (email: Email|null) => {
    setEmailContent(() => email);
  }

  return (
    <ComposeContext.Provider value={{ content, hasContent, doesntHaveContent, emailContent, setEmail}}>
      {children}
    </ComposeContext.Provider>
  )
}

export default ComposeProvider;

export {
  ComposeContext
}