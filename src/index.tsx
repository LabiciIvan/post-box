import { createRoot } from 'react-dom/client'
import { Router} from './Router';
import AuthProvider from './context/AuthContext';
import ViewSectionProvider from './context/ViewSectionContext';

import '../node_modules/bootstrap-icons/font/bootstrap-icons.scss'
import './index.scss';
import ComposeProvider from './context/ComposeContext';

const rootElement = document.getElementById('root') as HTMLElement;



createRoot(rootElement).render(
  <AuthProvider>
    <ViewSectionProvider>
      <ComposeProvider>
        <Router />
      </ComposeProvider>
    </ViewSectionProvider>
  </AuthProvider>
)
