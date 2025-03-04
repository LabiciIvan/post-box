import { createContext, useState } from 'react';
import { InboxTypeKeys, ViewSectionContextType } from '../types';

const defaultView: ViewSectionContextType = {
  title: 'inbox',
  selectView: () => {}
}

const ViewSectionContext = createContext<ViewSectionContextType>(defaultView);

const ViewSectionProvider = ({children} : {children: React.ReactNode}) => {

  const [title, setTitle] = useState<keyof InboxTypeKeys>(defaultView.title);

  const selectView = (selectedView: keyof InboxTypeKeys): void => {
    setTitle(() => selectedView);
  }

  return (
    <ViewSectionContext.Provider value={{ title, selectView }}>
      {children}
    </ViewSectionContext.Provider>
  )
}

export default ViewSectionProvider;

export {
  ViewSectionContext,
}