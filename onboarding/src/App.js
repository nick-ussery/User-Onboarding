import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';
import UserForm from './components/Form';
import FormSchema from './components/FormSchema';
import * as yup from 'yup';

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
  termsOfService: false
}

const initialUsers=[];
const intitialDisabled = true;

function App() {
  const [users, setUsers] = useState(initialUsers);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(intitialDisabled);

  const getUsers = () =>{
    axios.get()
    .then(response =>{
      // setUsers(response.data);
      console.log(response);
    })
    .catch(err=>{console.log(err)})
  }

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
    const name = evt.target.name;
    const {checked} = evt.target;

  setFormValues({...formValues,
    termsOfService:checked})
  }


  const onSubmit = evt =>{
    evt.preventDefault();

    const newUser ={
      name:formValues.name,
      email:formValues.email,
      password:formValues.password
    }

    setUsers([...users, newUser]);
  }

  useEffect( ()=>console.log(users),[users])

  //disabled effect on submit button
  useEffect(()=>{
    FormSchema.isValid(formValues)
    .then(valid =>{setDisabled(!valid)})
  },[formValues])

  return (
    <div className="App">
      <UserForm onChange={onChange} onCheckbox={onCheckbox} onSubmit={onSubmit} errors={formErrors} disabled={disabled} />
    </div>
  );
}

export default App;
