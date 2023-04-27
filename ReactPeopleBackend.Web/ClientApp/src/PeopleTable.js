import React from 'react';
import axios from 'axios';
import PersonForm from './PersonForm';
import PersonRow from './PersonRow';
import { render } from 'react-dom';
import { produce } from 'immer';


class PeopleTable extends React.Component {

    state = {
        people: [],
        person: {
            id: 0,
            firstName: '',
            lastName: '',
            age: ''
        },
        checkedPeople: [], 
        isEditing: false
    }

    componentDidMount() {
        axios.get('/api/people/getall').then(res => {
            this.setState({ people: res.data });
        });
    }

    onCheckboxChangeClick = p => {
        if(this.isChecked(p)){
            const checkedPeople = this.state.checkedPeople.filter(pe => pe.id !== p.id);
            this.setState({ checkedPeople });
        }
        else{
            const newState = produce(this.state, draftState => {
                draftState.checkedPeople.push(p);
            });
            this.setState(newState);
        }
    }

    isChecked = p => {
        const { checkedPeople } = this.state;
        return checkedPeople.some(pe => pe.id == p.id);
    }

    onTextChange = e => {        
        const copy = { ...this.state.person };        
        copy[e.target.name] = e.target.value;        
        this.setState({ person: copy });    
    }

    generatePeople = () => {
        axios.get('/api/people/getall').then(res => {
            this.setState({
                people: res.data,
                person: {
                    firstName: '',
                    lastName: '',
                    age: ''
                },
            });
        });
    }
    onAddClick = () => {
        axios.post('/api/people/addperson', this.state.person).then(this.generatePeople);
    }

    onEditClick = p => {
        const newState = produce(this.state, draftState => {
            draftState.person = {
                id: p.id,
                firstName: p.firstName,
                lastName: p.lastName,
                age: p.age
            };
            draftState.isEditing = true;
        });

        this.setState(newState);

    }

    onUpdateClick = () => {
        axios.post('/api/people/updatePerson', this.state.person)
            .then(this.onCancelClick)
            .then(this.generatePeople);

    }
    
    onCancelClick = () => {
        const newState = produce(this.state, draftState => {
            draftState.person = {
                id: 0,
                firstName: '',
                lastName: '',
                age: ''
            };
            draftState.isEditing = false;
        });

        this.setState(newState);
    }


    onDeleteClick = p => {
        axios.post('/api/people/deleteperson', p).then(this.generatePeople);
    }

    onDeleteAllClick = () => {        
            for(let i = 0; i < this.state.checkedPeople.length; i++){
                this.onDeleteClick(this.state.checkedPeople[i]);
            };
    }

    onUpdateCheckboxClick = isCheck => {
        const { people } = this.state;
        if(isCheck) {
            this.setState({checkedPeople: this.state.people});
         } else {
            this.setState({checkedPeople: []});
         }
    }

    render() {
        const { person, people } = this.state;
        const {id, firstName, lastName, age} = person;
        return(
   <div className='container mt-5'>   
                <PersonForm 
                    id={id} 
                    firstName={firstName} 
                    lastName={lastName} 
                    age={age} 
                    onAddClick={this.onAddClick} 
                    onTextChange={this.onTextChange} 
                    isEditing={this.state.isEditing} 
                    onUpdateClick={this.onUpdateClick} 
                    onCancelClick={this.onCancelClick}/>
                <table className='table table-hover table-striped table-bordered mt-3'>
                    <thead>
                        <tr>
                            <th>
                                <button onClick={this.onDeleteAllClick} className='btn btn-danger btn-block'>Delete All</button>
                                <button onClick={() => this.onUpdateCheckboxClick(true)} className='btn btn-info btn-block'>Check All</button>
                                <button onClick={() => this.onUpdateCheckboxClick(false)} className='btn btn-info btn-block'>Uncheck All</button>
                            </th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Age</th>
                            <th>Edit/Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                            {people.map(p => {
                                return <PersonRow 
                                        person={p}  
                                        key={p.id} 
                                        onCheckBoxChangeClick={() => this.onCheckboxChangeClick(p)} 
                                        onEditClick = {() => this.onEditClick(p)}
                                        onDeleteClick = {() => this.onDeleteClick(p)}
                                        isChecked = {this.isChecked(p)}
                                        />
                                })
                            }
                    </tbody>
                </table>
            </div>
        )
    }

}

export default PeopleTable;