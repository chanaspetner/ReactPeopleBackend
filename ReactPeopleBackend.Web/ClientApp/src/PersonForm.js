import React from 'react';

class PersonForm extends React.Component {
    render() {
        const { firstName, lastName, age, onAddClick, onTextChange, isEditing, onUpdateClick, onCancelClick} = this.props;
        return (
            <div className='row'>
                <div className='col-md-3 md-offset-2'>
                    <input value={firstName} name='firstName' onChange={onTextChange} className='form-control' placeholder='First Name' />
                </div>
                <div className='col-md-3'>
                    <input value={lastName} name='lastName' onChange={onTextChange} className='form-control' placeholder='Last Name' />
                </div>                
                <div className='col-md-3'>
                    <input value={age} name='age' onChange={onTextChange} className='form-control' placeholder='Age' />
                </div>
                <div className='col-md-3'>
                    {!isEditing && <button onClick={onAddClick} className='btn btn-primary btn-block'>Add</button>}
                    {!!isEditing && <div> 
                                        <button onClick={onUpdateClick} className='btn btn-warning btn-block'>Update</button>
                                        <button onClick={onCancelClick} className='btn btn-info btn-block'>Cancel</button>
                                    </div>}
                </div>
            </div>
        );
    }
}

export default PersonForm;