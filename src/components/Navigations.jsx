import { useEffect, useState } from 'react';
import { Link, Outlet } from "react-router-dom";
import '../css/navigations.css';
import 'bootstrap-icons/font/bootstrap-icons.css'

import {generateId} from './Utilities'
import { categoryData } from '../assets/data.js';

const Navigation = () => {

    const [width, setWidth] = useState('400px');
    const [visibility, setVisibility] = useState('grid');
    const [collapse, setCollapse] = useState(false);

    const [categories, setCategories] = useState(categoryData);

    const [categoryBlock, setCategoryBlock] = useState(false);
    const [categoryName, setCategoryName] = useState('');

    useEffect(() => {
        if (!categoryBlock) {
            setCategoryName('');
        }
    }, [categoryBlock]);

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

    const addCategory = () => {

        setCategoryBlock(false);

        if (categoryName.length === 0) {
            return;
        }

        let newCategory =  {
            id: generateId(categories, 'id'),
            name: categoryName,
            url: `/management-tool/categories/${categoryName}`,
            icon: 'bi bi-currency-exchange icon-size',
        }

        let copyCategories = [...categories];

        copyCategories.push(newCategory);

        setCategories(copyCategories);
    }

    return (
        <>
        <div className='navigation-menu'>
            <div className='navigation-logo' style={{display: visibility}}>
                <h3 className='logo-text'>Management Tool</h3>
            </div>
            <div className='navigation-body' style={{ width: width}} >
                {
                    categories.map((item) => 
                        <div key={item.id} className={'menu-wrapper'}>
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
                <div className="customize"><i className="bi bi-plus-square" onClick={() => setCategoryBlock(true)}></i></div>
                <div className='collapse-expand-menu' onClick={triggerCollapseExpandMenu}>
                    <i className={collapse ? "bi bi-arrow-right-short icon-size" : "bi bi-arrow-left-short icon-size"}></i>
                </div>
            </div>
        </div>
        <div className='category-block' style={{ display: categoryBlock ? 'flex' : 'none'}}>
            <div className='category-wrapper'>
                <button className='save-category btn' onClick={() => addCategory()}>save</button>
                <button className='close-category-block btn' onClick={() => setCategoryBlock(false)}>x</button>
                <textarea className='category-input' value={categoryName} onChange={(e) => setCategoryName(e.target.value)}></textarea>
            </div>
        </div>
        <Outlet />
        </>
    )
}

export default Navigation