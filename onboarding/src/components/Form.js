import React from 'react';
import { FormFeedback, Row, FormGroup, Form, Label, Input as FancyInput } from 'reactstrap';


export default function UserForm(props){

    const {onChange, onCheckbox, onSubmit, errors, disabled} = props;

return(
        <Form style={{marginRight:'auto', marginLeft:'auto',border:'1px solid black', textAlign:'left'}}>
            <FormGroup style={{width:'100%'}} row>
                <Row xl={2} md={2} sm={2}>
                <Label for='name' sm={2} style={{marginRight:'36px'}}>Name</Label>
                <FancyInput type='text' name='name' placeholder='Insert your Name' onChange={onChange}/>
                </Row>
                <FormFeedback>{errors.name}</FormFeedback>
            </FormGroup>
            <FormGroup row>
                <Row>
                <Label for='email' sm={2} style={{marginRight:'40px'}}>Email</Label>
                <FancyInput type='email' name='email'placeholder='Enter your email address' onChange={onChange}/>
                </Row>
                <FormFeedback>{errors.email}</FormFeedback>
            </FormGroup>
            <FormGroup row>
                <Row>
                <Label for='password' sm={2} style={{marginRight:'12px'}}>Password</Label>
                <FancyInput type='password' name='password' placeholder='Enter a new password' onChange={onChange}/>
                </Row>
                <FormFeedback>{errors.password}</FormFeedback>
            </FormGroup>
            <FormGroup row>
                <Row>
                <Label for='termsOfService' sm={2} style={{marginRight:'10px'}}>Read our Terms of Service</Label>
                <FancyInput type='checkbox' name='termsOfService'  onChange={onCheckbox}/>{' '}
                </Row>
            </FormGroup>
            <button disabled={disabled} onClick={onSubmit}>Submit</button>
        </Form>
)}