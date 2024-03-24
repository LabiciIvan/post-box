import React from 'react';
import Navigation from './Navigations';
import { createBrowserRouter, RouterProvider} from 'react-router-dom';


import Management from './Management';

const Router = () => {

    const router = createBrowserRouter([
        {
            path: "/management-tool/",
            element: <Navigation />,
            errorElement: <div>404 Not Found</div>,
            children: [
                {
                    path: "categories/:title",
                    element: <Management />,
                    errorElement: <div>404 Not Found</div>
                }
            ]
        }
    ])

    return (
        <>
            <RouterProvider router={router}/>
        </>
    );
}

export default Router;

