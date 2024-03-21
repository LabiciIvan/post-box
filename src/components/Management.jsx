import { useState } from 'react';
import '../css/management.css';

const Management = ({service, title}) => {

    const [display, setDisplay] = useState('none');
    const [details, setDetails] = useState(false);

    const moreDetails = (id) => {
        let item = service.find(item => item.id === id);
        setDisplay('flex');
        setDetails(item);
    }

    const closeDetails = () => {
        setDisplay('none');
    }

    return (
        <div className='main-management'>
            <div className="management-window">
                <div className="management-header">
                    <h3>{title}</h3>
                </div>
                <table className='management-table'>
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>Name</td>
                            <td>Details</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            service.map((serv) => 
                                <tr key={serv.id}>
                                    <td>{serv.id}</td>
                                    <td>{serv.name}</td>
                                    <td><h4 className='link-details' onClick={() => moreDetails(serv.id)}>More..</h4></td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
                <div className="details-wrapper" style={{display: display}}>
                    <div className="details">
                        <button className='close-details' onClick={closeDetails}>X</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Management;