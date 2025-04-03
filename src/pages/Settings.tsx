import { useNavigate } from 'react-router-dom';
import SettingsOverlay from '../components/SettingsOverlay';
import { act, ReactNode, useState } from 'react';
import { SettingsActionTypes } from '../types';

const Settings = (): React.ReactNode => {

  interface Action {
    children: React.ReactNode;
    action: () => void;
  }

  type ActionsJSXInteface  = {
    [key in SettingsActionTypes]: Action
  }

  const actionsJSX: ActionsJSXInteface = {
    changeTheme: {
      children: <div>changeTheme</div>,
      action: () => {

      }
    },
    language: {
      children: <div>language</div>,
      action: () => {

      }
    },
    contentLanguage: {
      children: <div>contentLanguage</div>,
      action: () => {

      }
    },
    soundEffects: {
      children: <div>soundEffects</div>,
      action: () => {

      }
    },
    closeAccount: {
      children: <div>closeAccount</div>,
      action: () => {

      }
    },
    hibernateAccount: {
      children: <div>hibernateAccount</div>,
      action: () => {

      }
    },
    paymentMethods: {
      children: <div>paymentMethods</div>,
      action: () => {

      }
    },
  }

  const navigate = useNavigate();

  const [action, setAction] = useState<SettingsActionTypes>('changeTheme');

  const [enabledOverlay, setEnabledOverlay] = useState<boolean>(false);

  const handleSettingsAction = (actionName: SettingsActionTypes): void => {
    setAction(() => actionName);
    setEnabledOverlay(() => true);
  }
  
  const closeSettingsAction = (): void => {
    console.log('close overlay', enabledOverlay);
    setAction(() => 'changeTheme');
    setEnabledOverlay(() => false);
  }

  return (
    <div className='settings'>
      { enabledOverlay && 
        <SettingsOverlay onCloseOverlay={closeSettingsAction} onApplyChange={actionsJSX[action]['action']}>
          {actionsJSX[action !== null ?  action : 'changeTheme']['children']}
        </SettingsOverlay>
      }
      <div className='container'>
        <button className='default-button' onClick={() => navigate('/')}>back</button>
        <div className='menu'>

          <div className='option'>
            <div className='header'>Display</div>
            <div className='action' onClick={() => handleSettingsAction('changeTheme')}>
              <div className='title'>Change Theme</div>
              <i className='bi bi-arrow-right' />
            </div>
          </div>

          <div className='option'>
            <div className='header'>General Preferences</div>
            <div className='action' onClick={() => handleSettingsAction('language')}>
              <div className='title'>Language</div>
              <i className='bi bi-arrow-right' />
            </div>
            <div className='action' onClick={() => handleSettingsAction('contentLanguage')}>
              <div className='title'>Content Language</div>
              <i className='bi bi-arrow-right' />
            </div>
            <div className='action' onClick={() => handleSettingsAction('soundEffects')}>
              <div className='title'>Sound effects</div>
              <i className='bi bi-arrow-right' />
            </div>
            <div className='action' onClick={() => handleSettingsAction('closeAccount')}>
              <div className='title'>Close account</div>
              <i className='bi bi-arrow-right' />
            </div>
            <div className='action' onClick={() => handleSettingsAction('hibernateAccount')}>
              <div className='title'>Hibernate account</div>
              <i className='bi bi-arrow-right' />
            </div>
            <div className='action' onClick={() => handleSettingsAction('paymentMethods')}>
              <div className='title'>Payment methods</div>
              <i className='bi bi-arrow-right' />
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Settings;