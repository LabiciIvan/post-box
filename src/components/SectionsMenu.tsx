import { useContext, useEffect, useState } from 'react';
import { InboxTypeKeys, NotificationsTypes, SectionMenuType } from '../types';
import { ViewSectionContext } from '../context/ViewSectionContext';
import { ComposeContext } from '../context/ComposeContext';
import { deleteEmailFromALocalStorageCategory, insertEmailInLocalStorage } from '../tests/database-mock';
import { AuthContext } from '../context/AuthContext';
import UnreadEmailCountContext from '../context/ReadEmailContext';
import FontContext from '../context/FontContext';
import NotificationsBadge from './NotificationsBadge';

const SectionsMenu = () => {

  const [showMenu, setShowMenu] = useState<boolean>(false);
  
  const compose = useContext(ComposeContext);

  const { content, doesntHaveContent, emailContent, setEmail} = compose;

  const [selected, setSelected] = useState<keyof InboxTypeKeys>('inbox');

  // NotificationBadge componen state
  const [showNotificationBadge, setShowNotificationBadge] = useState<boolean>(false);

  const [notificationMessages, setNotificationMessages] = useState<string[]>([]);

  const [notificationStatus, setNotificationStatus] = useState<NotificationsTypes>('warning');

  const closeNotificationBadge = (): void => {
    setNotificationMessages(() => []);
    setShowNotificationBadge(() => false);
  }


  // Context UnreadEmailsContext
  const unreadEmailsContext = useContext(UnreadEmailCountContext);

  const {unreadCount} = unreadEmailsContext;


  // Context ViewSectionContext
  const viewSection = useContext(ViewSectionContext);

  const { title, selectView } = viewSection;


  // Context AuthContext
  const auth = useContext(AuthContext);

  const {user} = auth;

  if (!user) {
    return;
  }


  // Context for FontContex
  const fontContext = useContext(FontContext);

  const {changeSize, changeType} = fontContext;

  const sectionLinks: SectionMenuType[]= [
    {
      view: 'compose',
      icon: <i className='bi bi-pencil-square'/>
    },
    {
      view: 'inbox',
      icon: <i className='bi bi-envelope'/>
    },
    {
      view: 'draft',
      icon: <i className='bi bi-clock-history'/>
    },
    {
      view: 'sent',
      icon: <i className='bi bi-send'/>
    },
    {
      view: 'deleted',
      icon: <i className='bi bi-trash3'/>
    },
  ];

  useEffect(() => {
    setSelected(() => title);
  }, [title]);

  const handleSelectView = (view: any): void => {
    // Switching view always check if the emails should be saved as draft.
    if (content && emailContent) {
      setShowNotificationBadge(() => true)
      setNotificationMessages(['Email message saved to draft.']);
      deleteEmailFromALocalStorageCategory(user.id, emailContent.id, 'draft');
      insertEmailInLocalStorage(emailContent, user.id, 'draft');
    }

    // Reset WriteSettings FontContext when switching from inbox or draft.
    if (view === 'inbox' || view === 'draft') {
      changeSize('16');
      changeType('Nunito')
    }

    // Smaller devices hide the show menu when toggled on.
    if (showMenu) {
      setShowMenu(() => false);
    }

    // Skip useless state update.
    if (view === selected) return;
    doesntHaveContent();
    setEmail(null);
    setSelected(() => view);
    selectView(view);
  }

  return (
    <nav className='sections-menu'>
      {
        showNotificationBadge && <NotificationsBadge messages={notificationMessages} status={notificationStatus} onCloseNotification={closeNotificationBadge}/>
      }

      <div className='app-logo'>
        Post-Box
      </div>

      {/* <div className='links-menu'> */}
      <div className={`links-menu ${showMenu && 'show-menu'}`}>
        <button className='show-toggle-button' onClick={() => setShowMenu(prev => !prev)}>{ showMenu ? <i className='bi bi-arrow-left'/> : <i className='bi bi-arrow-right'/>}</button>
      {
        sectionLinks.map(nav =>
          <div className={`link ${selected === nav.view && 'selected'}`} key={nav.view} onClick={() => handleSelectView(nav.view)}>
              <div className='icon'>
                {nav.icon}
              </div>
              <div className='view'>
                {nav.view}
              </div>
              <div className={`count ${nav.view === 'inbox' && '_inbox'}`}>
                { nav.view === 'inbox' && unreadCount > 0 ? unreadCount : '' }
              </div>
          </div>
        )
      }
      </div>
    </nav>
  )
}

export default SectionsMenu;