import { useState } from 'react';
import { Link, Outlet } from "react-router-dom";
import '../css/navigations.css';
import 'bootstrap-icons/font/bootstrap-icons.css'

const Navigation = () => {

    const [width, setWidth] = useState('400px');
    const [visibility, setVisibility] = useState('grid');
    const [collapse, setCollapse] = useState(false);

    const navItems = [
        {
            id: 1,
            name: 'Products',
            url: '/management-tool/products',
            icon: 'bi bi-shop icon-size',
            position: 'wrapper-first',
        },
        {
            id: 2,
            name: 'Customers',
            url: '/management-tool/customers',
            icon: 'bi bi-people-fill icon-size',
            position: 'wrapper-second',
        },
        {
            id: 3,
            name: 'Transactions',
            url: '/management-tool/transactions',
            icon: 'bi bi-currency-exchange icon-size',
            position: 'wrapper-third',
        }
    ];

    const triggerCollapseExpandMenu = () => {
        if (collapse) {
            setWidth('400px');
            setVisibility('grid');
        } else {
            setWidth('15px');
            setVisibility('none');
        }

        setCollapse(!collapse);
    }

    return (
        <>
        <div className='navigation-menu'>
            <div className='navigation-logo' style={{display: visibility}}>
                <h3 className='logo-text'>Management Tool</h3>
            </div>
            <div className='navigation-body' style={{ width: width}} >
                {
                    navItems.map((item) => 
                        <div key={item.id} className={'menu-wrapper ' + item.position}>
                            <Link className="menu-section" to={item.url} style={{display: visibility}}>
                                <div className='item-icon'>
                                    <i className={item.icon}></i>
                                </div>
                                <div className='item-text'>
                                    {item.name}
                                </div>
                            </Link>
                        </div>
                    )
                }
                <div className='collapse-expand-menu' onClick={triggerCollapseExpandMenu}>
                    <i className={collapse ? "bi bi-arrow-right-short icon-size" : "bi bi-arrow-left-short icon-size"}></i>
                </div>
            </div>
        </div>
        <Outlet />
        </>
    )
}

export default Navigation