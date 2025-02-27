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
import Logout from './components/Logout';
import NavigationBar from './components/NavigationBar';

const Router = () => {

  // Use createBrowserRouter for normal deployments
  // const router = createBrowserRouter([
  //   {
  //     path: 'post-box/',
  //     element:
  //     <App>
  //       <NavigationBar>
  //         <Logout />
  //       </NavigationBar>
  //       <SectionsMenu />
  //       <SectionView />
  //     </App>
  //   },
  //   {
  //     path: 'post-box/login',
  //     element: <Login />
  //   }
  // ]);

  return (
    // <RouterProvider router={router} />

    // Use HashRouter for deployments on GitHub Pages
    <HashRouter>
      <Routes>
        <Route
          path='/'
          element={
            <App>
              <NavigationBar>
                <Logout />
              </NavigationBar>
              <SectionsMenu />
              <SectionView />
            </App>
          }
        />
        <Route path='/login' element={<Login />} />
      </Routes>
    </HashRouter>
  )
}

export { Router };
