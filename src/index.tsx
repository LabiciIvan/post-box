import { createRoot } from 'react-dom/client'
import { Router} from './Router';
import AuthProvider from './context/AuthContext';
import ViewSectionProvider from './context/ViewSectionContext';

import '../node_modules/bootstrap-icons/font/bootstrap-icons.scss'
import './index.scss';
import ComposeProvider from './context/ComposeContext';
import SearchProvider from './context/SearchContext';
import LoginProvider from './context/LoginContext';
import { UnreadEmailCountProvider } from './context/ReadEmailContext';
import { FontContextProvider } from './context/FontContext';

const rootElement = document.getElementById('root') as HTMLElement;

createRoot(rootElement).render(
  <AuthProvider>
    <ViewSectionProvider>
      <ComposeProvider>
        <SearchProvider>
          <LoginProvider>
            <UnreadEmailCountProvider>
              <FontContextProvider>
                <Router />
              </FontContextProvider>
            </UnreadEmailCountProvider>
          </LoginProvider>
        </SearchProvider>
      </ComposeProvider>
    </ViewSectionProvider>
  </AuthProvider>
)
