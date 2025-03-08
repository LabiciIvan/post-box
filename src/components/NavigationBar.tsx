import { useState } from 'react';
import SearchEmails from './SearchEmails';

const NavigationBar = ({children} : {children: React.ReactNode}) => {

  const [search, setSearch] = useState<string>('');

  return (
    <nav className='navigation-bar'>
      <div className='nav-link'>
        <SearchEmails />
      </div>
      <div className='nav-link'></div>
      <div className='nav-link'></div>
      <div className='children-links'>
        { children }
      </div>
    </nav>
  )
}

export default NavigationBar;