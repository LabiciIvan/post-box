import { useEffect, useState } from 'react';
import { cloneDeep } from 'lodash';

import '../css/management.css';
import { listData } from '../assets/data.js';
import { useParams } from 'react-router-dom';

import {generateId} from './Utilities'

const Management = () => {

    const {title} = useParams();

    const [data, setData]                       = useState(listData);
    const [updateData, setUpdatedData]          = useState(false);

    const [categoryWindow, setCategoryWindow]   = useState(false);
    const [notesWindow, setNotesWindow]         = useState(false);
    const [item, setItem]                       = useState('');
    const [itemName, setItemName]               = useState(false);

    useEffect(() => {
        if (!categoryWindow) {
            setItemName('');
        }
    }, [categoryWindow]);

    const getPosition = (data, id) => {
        for (let i = 0; i < data.length; ++i) {
            if (data[i]['id'] === id) {
                return i;
            }
        }
    }

    const selectItem = (id) => {
        let index = getPosition(data[title], id);
        setNotesWindow(true);
        setItem(data[title][index]);
    }

    const deleteItemNote = (label, id) => {
        let index = getPosition(data[title], id);

        let copyData = cloneDeep(data);

        delete copyData[title][index][label];

        setItem(copyData[title][index]);
        setUpdatedData(copyData);
    }

    const closeNoteWindow = (save) => {
        setNotesWindow(false);
        setItem(false);

        if (save) {
            setData((updateData ? updateData : data));
        }
    }

    const handleInput = (value, key, id) => {

        let copyData = cloneDeep(data);

        let index = getPosition(copyData[title], id);

        copyData[title][index][key] = value;

        setUpdatedData(copyData);
    }

    const saveItemToCategory = () => {

        if (!itemName) {
            setCategoryWindow(false);
            return;
        }

        let copyData = cloneDeep(data);

        if (!copyData[title]) {
            copyData[title] = [];
        }

        let newItem = {
            id: generateId(copyData[title], 'id'),
            name: itemName
        }

        copyData[title].push(newItem);

        setData(copyData);
        setCategoryWindow(false);
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
                                <div className='item-delete'>{ label !== 'name' ? <i className='bi bi-trash-fill' onClick={() => deleteItemNote(label, item['id'])}></i> : ''}</div>
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
                    <div className="add-to-category">
                        <div className="new-category-section" onClick={() => setCategoryWindow(true)}>
                            <i className="bi bi-stack"></i>
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
                    {data[title] ? data[title].map((item, index) =>
                        <div className='item-wrapper' key={index}>
                            <div className='item-id'>{index}</div>
                            <div className='item-name'>{item.name}</div>
                            <div className='item-more' onClick={() => selectItem(item.id)}><i className='bi bi-arrows-angle-expand'></i></div>
                        </div>
                    ) : ''}
                </div>

                <div className="block-window" style={{display: (categoryWindow ? 'flex' : 'none')}}>
                    <div className="item-creation">
                        <button className='save-item-category btn' onClick={() => saveItemToCategory()}>Save</button>
                        <button className='close-item-category btn' onClick={() => setCategoryWindow(false)}>X</button>
                        <label className='item-name-label'>Name</label>
                        <textarea className='item-name-textarea'  onChange={(e) => setItemName(e.target.value)} value={itemName}></textarea>
                    </div>
                </div>

                <div className='block-window' style={{display: (notesWindow ? 'flex' : 'none')}}>
                    <div className='details-wrapper'>
                        <div className='item-title'>{item ? item.name : ''}</div>
                        <button className='save-item btn' onClick={() => closeNoteWindow(true)}>Save</button>
                        <button className='close-item btn' onClick={() => closeNoteWindow(false)}>X</button>

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