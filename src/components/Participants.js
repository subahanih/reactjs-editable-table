import React, { useState, Fragment, useMemo } from 'react';
import data from '../data/mock-data.json';
import { nanoid } from 'nanoid';
import EditableRow from './EditableRow';
import ReadOnlyRow from './ReadOnlyRow';

const Participants = () => {

    const [participants, setParticipants] = useState(data);

    const [error, setError] = useState({ name: '', email: '', phone: '' });

    const [addFormData, setAddFormData] = useState({ name: '', email: '', phone: '' });

    const [editFormData, setEditFormData] = useState({ name: '', email: '', phone: '' });

    const [editParticipantId, setEditParticipantId] = useState(null);

    const [sortConfig, setSortConfig] = useState({config: ''});

    /* This function will return sorted participants data 
       based on desired sorting order */
    const sortedParticipants = useMemo(() => {
        let sortableItems = [...participants];
        if (sortConfig !== null) {
          sortableItems.sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
              return sortConfig.direction === 'ascending' ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
              return sortConfig.direction === 'ascending' ? 1 : -1;
            }
            return 0;
          });
        }
        return sortableItems;
    }, [participants, sortConfig]);

    /* This function will be invoked when reuired to sort participants data
       based on desired sorting order */
    const requestSort = (key) => {
        let direction = 'ascending';
        if (
          sortConfig &&
          sortConfig.key === key &&
          sortConfig.direction === 'ascending'
        ) {
          direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    /* This function will be invoked to fetch css class dynamically 
       based on desired sorting order */
    const getClassNameFor = (columnName) => {
        if (!sortConfig) {
            return;
        }
        return sortConfig.key === columnName ? sortConfig.direction : undefined;
    }

    /* This function will be invoked to add/update the new participant state */
    const handleAddFormChange = (event) => {
        event.preventDefault();
        const newFormData = {...addFormData};
        newFormData[event.target.id] = event.target.value;
        setAddFormData(newFormData);
    }

    /* This function will be invoked to add a new participant into participants state */
    const handleAddFormSubmit = (event) => {
        event.preventDefault();
        if(validate()) {
            const newParticipant = {
                id:nanoid(),
                name: addFormData.name,
                email: addFormData.email,
                phone: addFormData.phone
            }

            const newParticipants = [...participants, newParticipant];
            setParticipants(newParticipants);

            const newFormData = { name: '', email: '', phone: '' };
            setAddFormData(newFormData);
        }
    }

    /* This function will be invoked to update a existing participant from state */
    const handleEditFormChange = (event) => {
        event.preventDefault();
        const newFormData = { ...editFormData };
        newFormData[event.target.id] = event.target.value;
        setEditFormData(newFormData);
    }

    /* This function will be invoked to update a participant from participants state */
    const handleEditFormSubmit = (event) => {
        event.preventDefault();
        const editedParticipants = {
            id: editParticipantId,
            name: editFormData.name,
            email: editFormData.email,
            phone: editFormData.phone
        };

        const newParticipants = [...participants];

        const index = participants.findIndex((participant) => participant.id === editParticipantId);

        newParticipants[index] = editedParticipants;

        setParticipants(newParticipants);
        setEditParticipantId(null);
    }

    /* This function will be invoked to enable edit mode of a row from the table */
    const handleEditClick = (event, partcipant) => {
        event.preventDefault();
        setEditParticipantId(partcipant.id);

        const formValues = {
            name: partcipant.name,
            email: partcipant.email,
            phone: partcipant.phone
        };
    
        setEditFormData(formValues);
    }

    /* This function will be invoked to disable edit mode of a row from the table */
    const handleCancelClick = () => {
        setEditParticipantId(null);
    }

    /* This function will be invoked to remove a participant from the table */
    const handleDeleteClick = (partcipantId) => {
        const newParticipants = [...participants];
        const index = participants.findIndex((participant) => participant.id === partcipantId);
        newParticipants.splice(index, 1);
        setParticipants(newParticipants);
    }

    /* This function will be invoked to validate fields.
       Will check empty values of all fields.
       Will check email field contains valid e-mail id.
       Will check phone field contains valid phone numbers */
    const validate = () => {
        let errors = {};
        let isValid = true;
        if (addFormData.name === '') {
            isValid = false;
            errors['name'] = 'Please enter your full name.';
        }

        if (addFormData.email === '') {
            isValid = false;
            errors['email'] = 'Please enter your email address.';
        }

        if (typeof addFormData.email !== 'undefined'  && addFormData.email !== '') {
            var patternEmail = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!patternEmail.test(addFormData.email)) {
              isValid = false;
              errors['email'] = 'Please enter valid email address.';
            }
        }

        if (addFormData.phone === '') {
            isValid = false;
            errors['phone'] = 'Please enter your phone number.';
        }

        if (typeof addFormData.phone !== 'undefined' && addFormData.phone !== '') {
            var patternPhone = new RegExp(/^[0-9\b]+$/);
            if (!patternPhone.test(addFormData.phone)) {
              isValid = false;
              errors['phone'] = 'Please enter only number.';
            } else if (addFormData.phone.length !== 10) {
              isValid = false;
              errors['phone'] = 'Please enter valid phone number.';
            }
        }

        setError(errors);

        return isValid;
    }

    
    return (
        <div className="participants-container">
            <h3 className="participants-heading">List of participants</h3>

            <form
                className="participants-form" 
                onSubmit={handleAddFormSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        id="name" 
                        className="name-txt-fld" 
                        placeholder="Full name"
                        onChange={handleAddFormChange}
                        value={addFormData.name}/>
                    <label className="error-text">{error.name}</label>
                </div>
                <div className="form-group">
                    <input 
                        type="text"
                        id="email"
                        className="email-txt-fld" 
                        placeholder="E-mail address"
                        onChange={handleAddFormChange}
                        value={addFormData.email}/>
                    <label className="error-text">{error.email}</label>
                </div>
                <div className="form-group">
                    <input 
                        type="text"
                        id="phone"
                        className="phone-txt-fld" 
                        placeholder="Phone number"
                        onChange={handleAddFormChange}
                        value={addFormData.phone}/>
                    <label className="error-text">{error.phone}</label>
                </div>
                <div className="form-group">
                    <input type="submit" value="Add new" className="add-button" />
                </div>
            </form>

            <div className="table-container">
                <form onSubmit={handleEditFormSubmit}>
                    <table>
                        <thead>
                            <tr>
                                <th>
                                    <button
                                        onClick={() => requestSort('name')}
                                        className={getClassNameFor('name')}>
                                        Name
                                    </button>
                                </th>
                                <th>
                                    <button
                                        onClick={() => requestSort('email')}
                                        className={getClassNameFor('email')}>
                                        E-mail address
                                    </button>
                                </th>
                                <th>
                                    <button
                                        onClick={() => requestSort('phone')}
                                        className={getClassNameFor('phone')}>
                                        Phone number
                                    </button>
                                </th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedParticipants.map(participant => (
                                <Fragment key={participant.id}>
                                    {editParticipantId === participant.id ? (
                                        <EditableRow 
                                            editFormData={editFormData}
                                            handleEditFormChange={handleEditFormChange}
                                            handleCancelClick={handleCancelClick}/>
                                    ) : (
                                        <ReadOnlyRow
                                            participant={participant}
                                            handleEditClick={handleEditClick}
                                            handleDeleteClick={handleDeleteClick}/>
                                    )}
                                </Fragment>
                            ))}
                        </tbody>
                    </table>
                </form>
            </div>
        </div>
    );
};

export default Participants