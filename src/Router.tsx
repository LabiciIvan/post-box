import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Routes,
  HashRouter
} from 'react-router-dom';

import Login from './pages/Login';
import App from './App';
import SectionsMenu from './components/SectionsMenu';
import SectionView from './components/SectionView';
import NavigationBar from './components/NavigationBar';
import DummyUsers from './pages/DummyUsers';
import UserBadge from './components/UserBadge';
import Profile from './pages/Profile';
import Settings from './pages/Settings';

const Router = () => {

  return (
    // Use HashRouter for deployments on GitHub Pages
    <HashRouter>
      <Routes>
        <Route
          path='/'
          element={
            <App>
              <NavigationBar>
                <UserBadge />
                {/* <Logout /> */}
              </NavigationBar>
              <SectionsMenu />
              <SectionView />
            </App>
          }
        />
        <Route
          path='/login'
          element={
            <App>
              <DummyUsers />
              <Login />
            </App>
          }
        />
        <Route
          path='/profile'
          element={
            <App>
              <Profile />
            </App>
          }
        />
        <Route
          path='/settings'
          element={
            <App>
              <Settings />
            </App>
          }
        />
      </Routes>
    </HashRouter>
  )
}

export { Router };
