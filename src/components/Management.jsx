import { useEffect, useState } from 'react';
import '../css/management.css';

const Management = ({service, title}) => {

    const [display, setDisplay] = useState('none');
    const [details, setDetails] = useState(false);

    const findItemAndDisplay = (id) => {
        let item = service.find(item => item.id === id);
        setDisplay('flex');
        setDetails(item);
    }

    const closeDetails = () => {
        setDisplay('none');
        setDetails(false);
    }
    
    const saveDetails = (id) => {
        setDisplay('none');
        setDetails(false);
    }

    const loadDetails = () => {

        let itemKeys = Object.keys(details);

        let chunks = [];

        for (let i = 0; i < itemKeys.length; i += 3) {
            chunks.push(itemKeys.slice(i, i + 3));
        }

        return (
            chunks.map((chunk, index) => (
                <div className="item-column" key={index}>
                    {
                        chunk.map((bit, bitIndex) => (
                            <div className="item-data" key={bitIndex}>
                                <div className="item-label">{bit}</div>
                                <div className="item-delete"><i className="bi bi-trash-fill"></i></div>
                                <textarea className="item-textarea">{details[bit]}</textarea>
                            </div>
                        ))
                    }
                </div>
            ))
        )
    }

    return (
        <div className='main-management'>
            <div className="management-window">
                <div className="management-header">
                    <div className="management-title">
                        <div className="title-section">
                            <h3>{title}</h3>
                        </div>
                    </div>
                    <div className="management-time">
                        <div className="time-section">
                        <div className="time-text">09:00:03</div>
                            <div className="time-icon"><i className="bi bi-clock-fill"></i></div>
                        </div>
                    </div>
                </div>

                <div className="management-body">
                    {service.map(item =>
                        <div className="item-wrapper" key={item.id}>
                            <div className="item-id">{item.id}</div>
                            <div className="item-name">{item.name}</div>
                            <div className="item-more" onClick={() => findItemAndDisplay(item.id)}><i className="bi bi-arrows-angle-expand"></i></div>
                        </div>
                    )}
                </div>

                <div className="block-window" style={{display: display}}>
                    <div className="details-wrapper">
                        <div className="item-title">{details ? details.name : ''}</div>
                        <button className='save-item btn' onClick={() => saveDetails(details['id'])}>Save</button>
                        <button className='close-item btn' onClick={closeDetails}>X</button>

                        <div className="item-specifications">
                            {details ? loadDetails() : ''}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Management;