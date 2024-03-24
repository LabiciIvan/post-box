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
                    path: "products",
                    element: <Management  title={'products'}/>,
                    errorElement: <div>404 Not Found</div>
                },
                {
                    path: "customers",
                    element: <Management  title={'customers'}/>,
                    errorElement: <div>404 Not Found</div>
                },
                {
                    path: "transactions",
                    element: <Management title={'transactions'}/>,
                    errorElement: <div>404 Not Found</div>
                }
            ]
        },

    ])

    return <RouterProvider router={router}/>;
}

export default Router;

