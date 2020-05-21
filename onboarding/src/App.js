import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';
import UserForm from './components/Form';
import FormSchema from './components/FormSchema';
import * as yup from 'yup';
import UserCard from './components/UserCard';

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
  const [userCards, addCards] = useState(undefined)

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
      if(users.length===0){
        setUsers([response.data])
      }else{
        setUsers([...users, response.data])
      }
    })
  }


  //disabled effect on submit button
  useEffect(()=>{
    FormSchema.isValid(formValues)
    .then(valid =>{
      // console.log('valid', valid)
      if(formValues.termsOfService){setDisabled(!valid)}else(setDisabled(true))
    })
  },[formValues])


useEffect(()=>{
  console.log('all users', users)
  addCards(users.map(user=>{
    console.log('just one user',user);
    return <UserCard key={user.id} name={user.name} email={user.email} password={user.password} id={user.id} createdAt={user.createdAt} />
  }))
},[users])

  return (
    <div className="App">
      <UserForm onChange={onChange} onCheckbox={onCheckbox} onSubmit={onSubmit} errors={formErrors} disabled={disabled} />
      <div style={{display:'flex', flexWrap:'wrap'}}>
      {userCards}
      </div>
    </div>
  );
}

export default App;
