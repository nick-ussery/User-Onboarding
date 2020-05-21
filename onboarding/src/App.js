import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';
import UserForm from './components/Form';
import FormSchema from './components/FormSchema';
import * as yup from 'yup';
import {v4 as uuid} from 'uuid';
import UserCard from './components/UserCard';
import {Row} from 'reactstrap';

const url = 'https://reqres.in/api/users';

const initialFormValues = {
  name: '',
  email: '',
  password:'',
  termsOfService: false
}

const initialFormErrors={
  name: '',
  email: '',
  password:'',
  termsOfService: false,
}

const initialUsers=[];
const intitialDisabled = true;

function App() {
  const [users, setUsers] = useState(initialUsers);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(intitialDisabled);
  const [userCards, addCards] = useState(undefined);
  const [newUser, makeUser] = useState({});

  const onChange = (evt) =>{
    const name =  evt.target.name;
    const value = evt.target.value;

    // console.log('event', name, value)

    //yup validation
    yup 
      .reach(FormSchema, name)
      .validate(value)
      .then(valid=>{
        setFormErrors({
          ...formErrors,
          [name]: ''
        })
      })
      .catch(err=>{
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0]
        })
      })


      setFormValues({
        ...formValues,
        [name]: value
      })

  }

  const onCheckbox = evt =>{
    const {name} = evt.target;
    const {checked} = evt.target;

  setFormValues({...formValues,
    [name]:checked})
  }

  const onSubmit = evt =>{
    evt.preventDefault();
//makes a user out of the form data
    const preUser={
      name:formValues.name,
      email:formValues.email,
      password:formValues.password,
    }
//sends the new user to the api to retrieve a new user that will then be added to users array
    axios({method: 'post', url:url,data:preUser})
    .then(response=>{
      console.log('post request response',response.data)
      makeUser(response.data)
    })
  }
//adds the newUser to the users array
  useEffect(()=>{
    console.log('newUser', newUser)
    setUsers([...users, newUser])
  }

    ,[newUser])

  // useEffect( ()=>console.log('users',users),[users])

  //disabled effect on submit button
  useEffect(()=>{
    FormSchema.isValid(formValues)
    .then(valid =>{
      // console.log('valid', valid)
      if(formValues.termsOfService){setDisabled(!valid)}else(setDisabled(true))
    })
  },[formValues])

  useEffect(()=>{
    axios.get('https://reqres.in/api/users')
    .then(response=>{
      // console.log('post request',response)
      console.log('response', response.data.data)
      setUsers(response.data.data);
    })
    .catch(err=>{console.log(err)})
  },[])

useEffect(()=>{
  console.log('all users', users)
  addCards(users.map(user=>{
    console.log('just one user',user);
    let NAME;
    if(!user.last_name){NAME=user.name}else{NAME= `${user.first_name} ${user.last_name}`}
    return <UserCard key={uuid()} name={NAME} email={user.email} password={user.password} />
  }))
},[users])

  return (
    <div className="App">
      <UserForm onChange={onChange} onCheckbox={onCheckbox} onSubmit={onSubmit} errors={formErrors} disabled={disabled} />
      <div style={{display:'flex', justifyContent:'space-between', flexWrap:'wrap'}}>
      {userCards}
      </div>
    </div>
  );
}

export default App;
