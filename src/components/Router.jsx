import React from 'react';
import Navigation from './Navigations';
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import data from '../assets/data';

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
                    element: <Management service={data.products} title={'Products'}/>,
                    errorElement: <div>404 Not Found</div>
                },
                {
                    path: "customers",
                    element: <Management service={data.customers} title={'Customers'}/>,
                    errorElement: <div>404 Not Found</div>
                },
                {
                    path: "transactions",
                    element: <Management service={data.transactions} title={'Transactions'}/>,
                    errorElement: <div>404 Not Found</div>
                }
            ]
        },

    ])

    return <RouterProvider router={router}/>;
}

export default Router;

