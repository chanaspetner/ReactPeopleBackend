import React from 'react';

class PersonRow extends React.Component {
    render() {
        const{ onCheckBoxChangeClick, onEditClick, onDeleteClick, person, isChecked} = this.props;
        const { id, firstName, lastName, age } = person;
     return <tr>
                <td>
                    <input checked={isChecked} onChange={onCheckBoxChangeClick} className='form-control' type='checkbox'/>
                </td>
                <td>{firstName}</td>
                <td>{lastName}</td>
                <td>{age}</td>
                <td>
                    <button className='btn btn-warning' onClick={onEditClick}>Edit</button>
                    <button className='btn btn-danger' onClick={onDeleteClick}>Delete</button>
                </td>
            </tr>
        

    }


}

export default PersonRow;