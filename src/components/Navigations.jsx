import { useState } from 'react';
import '../css/navigations.css';
import 'bootstrap-icons/font/bootstrap-icons.css'

const Navigation = () => {

    const [width, setWidth] = useState('400px');
    const [visibility, setVisibility] = useState('flex');
    const [collapse, setCollapse] = useState(false);

    const navItems = [
        {
            id: 1,
            name: 'Products',
            icon: 'bi bi-shop icon-size',
            position: 'wrapper-first',
        },
        {
            id: 2,
            name: 'Customers',
            icon: 'bi bi-people-fill icon-size',
            position: 'wrapper-second',
        },
        {
            id: 3,
            name: 'Transactions',
            icon: 'bi bi-currency-exchange icon-size',
            position: 'wrapper-third',
        }
    ];

    const triggerCollapseExpandMenu = () => {
        if (collapse) {
            setWidth('400px');
            setVisibility('flex');
        } else {
            setWidth('30px');
            setVisibility('none');
        }

        setCollapse(!collapse);
    }
    
    return (
        <div className='navigation-menu'>
            <div className='navigation-logo' style={{display: visibility}}>
                <h3 className='logo-text'>Management Tool</h3>
            </div>
            <div className='navigation-body' style={{ width: width}}>
                {
                    navItems.map((item) => 
                        <div key={item.id} className={'menu-wrapper ' + item.position}>
                        <div className='menu-item' style={{display: visibility}}>
                            <div className='item-icon'>
                                <i className={item.icon}></i>
                            </div>
                            <div className='item-text'>
                                {item.name}
                            </div>
                        </div>
                    </div>
                    )
                }
                <div className='collapse-expand-menu' onClick={triggerCollapseExpandMenu}>
                    <i className={collapse ? "bi bi-arrow-right-short icon-size" : "bi bi-arrow-left-short icon-size"}></i>
                </div>
            </div>
        </div>
    )
}

export default Navigation