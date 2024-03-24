import { useState } from 'react';
import { cloneDeep } from 'lodash';

import '../css/management.css';
import listData from '../assets/data';

const Management = ({title}) => {

    const [data, setData]       = useState(listData);
    const [future, setFuture]   = useState(false);
    const [display, setDisplay] = useState('none');
    const [item, setItem]       = useState(false);

    const getPosition = (data, id) => {
        for (let i = 0; i < data.length; ++i) {
            if (data[i]['id'] === id) {
                return i;
            }
        }
    }

    const selectItem = (id) => {
        let index = getPosition(data[title], id);
        setDisplay('flex');
        setItem(data[title][index]);
    }

    const deleteItemEntry = (label, id) => {
        let index = getPosition(data[title], id);

        let copyData = cloneDeep(data);

        delete copyData[title][index][label];

        setItem(copyData[title][index]);
        setFuture(copyData);
    }

    const closeWindow = () => {
        setDisplay('none');
        setItem(false);
    }

    const saveItem = () => {
        setDisplay('none');
        setItem(false);
        setData((future ? future : data));
    }

    const handleInput = (value, key, id) => {

        let copyData = cloneDeep(data);

        let index = getPosition(copyData[title], id);

        copyData[title][index][key] = value;

        setFuture(copyData);
    }

    const loadItem = () => {

        let itemKeys = Object.keys(item);

        let chunks = [];

        for (let i = 0; i < itemKeys.length; i += 3) {
            chunks.push(itemKeys.slice(i, i + 3));
        }

        return (
            chunks.map((chunk, index) => (
                <div className='item-column' key={index}>
                    {
                        chunk.map((label, bitIndex) => (
                            <div className='item-data' key={bitIndex}>
                                <div className='item-label'>{label}</div>
                                <div className='item-delete'><i className='bi bi-trash-fill' onClick={() => deleteItemEntry(label, item['id'])}></i></div>
                                <textarea className='item-textarea' onChange={(e) => handleInput(e.target.value, label, item['id'])} defaultValue={item[label]}></textarea>
                            </div>
                        ))
                    }
                </div>
            ))
        )
    }

    return (
        <div className='main-management'>
            <div className='management-window'>
                <div className='management-header'>
                    <div className='management-title'>
                        <div className='title-section'>
                            <h3>{title}</h3>
                        </div>
                    </div>
                    <div className='management-time'>
                        <div className='time-section'>
                        <div className='time-text'>09:00:03</div>
                            <div className='time-icon'><i className='bi bi-clock-fill'></i></div>
                        </div>
                    </div>
                </div>

                <div className='management-body'>
                    {data[title].map((item, index) =>
                        <div className='item-wrapper' key={index}>
                            <div className='item-id'>{index}</div>
                            <div className='item-name'>{item.name}</div>
                            <div className='item-more' onClick={() => selectItem(item.id)}><i className='bi bi-arrows-angle-expand'></i></div>
                        </div>
                    )}
                </div>

                <div className='block-window' style={{display: display}}>
                    <div className='details-wrapper'>
                        <div className='item-title'>{item ? item.name : ''}</div>
                        <button className='save-item btn' onClick={() => saveItem()}>Save</button>
                        <button className='close-item btn' onClick={() => closeWindow()}>X</button>

                        <div className='item-specifications'>
                            {item ? loadItem() : ''}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Management;