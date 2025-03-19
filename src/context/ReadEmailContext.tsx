import { createContext, useState } from 'react';

type UnreadEmailCountContextType = {
  unreadCount: number
  updateCount: (number: number) => void,
}

const UnreadEmailCountContext = createContext<UnreadEmailCountContextType>({
  unreadCount: 0,
  updateCount: (number: number) => {},
});


const UnreadEmailCountProvider = ({children}:{children:React.ReactNode}): React.ReactNode => {

  const [unreadCount, setUnreadCount] = useState<number>(0);

  const updateCount = (number: number): void => {
    setUnreadCount(() => number);
  }

  return (
    <UnreadEmailCountContext.Provider value={{ unreadCount, updateCount }}>
      {children}
    </UnreadEmailCountContext.Provider>
  )
}

export default UnreadEmailCountContext;

export {
  UnreadEmailCountProvider
}

