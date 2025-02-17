import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from 'react-router-dom';

import Login from './pages/Login';
import App from './App';
import SectionsMenu from './components/SectionsMenu';
import SectionView from './components/SectionView';
import Logout from './components/Logout';
import NavigationBar from './components/NavigationBar';

const Router = () => {

  const router = createBrowserRouter([
    {
      path: 'post-box/',
      element:
      <App>
        <NavigationBar>
          <Logout />
        </NavigationBar>
        <SectionsMenu />
        <SectionView />
      </App>
    },
    {
      path: 'post-box/login',
      element: <Login />
    }
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export { Router };
