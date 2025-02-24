import { createContext, useState } from 'react';


interface ComposeContentType {
  content: boolean,
  hasContent: () => void,
  doesntHaveContent: () => void,
}

const ComposeContext = createContext<ComposeContentType>({
  content: false,
  hasContent: () => {},
  doesntHaveContent: () => {},
});

const ComposeProvider = ({children}:{children: React.ReactNode}): React.ReactNode => {

  const [content, setContent] = useState<boolean>(false);

  const hasContent = () => {
    setContent(() => true);
  }

  const doesntHaveContent = () => {
    setContent(() => false);
  }

  return (
    <ComposeContext.Provider value={{ content, hasContent, doesntHaveContent }}>
      {children}
    </ComposeContext.Provider>
  )
}

export default ComposeProvider;

export {
  ComposeContext
}