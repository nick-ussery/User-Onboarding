import React from 'react';
import * as yup from 'yup';
import { Row, FormGroup, Button, Col, Form, Label, Input as FancyInput } from 'reactstrap';

export default function UserForm(props){


    return(
        <Form style={{width:'850px', border:'1px solid black', textAlign:'left'}}>
            <FormGroup style={{width:'100%'}} row>
                <Row xl={2} md={2} sm={2}>
                <Label for='name' sm={2}>Name</Label>
                <Col sm={10}>
                <FancyInput type='text' name='name' placeholder='Insert your Name'/>
                </Col>
                </Row>
            </FormGroup>
            <FormGroup row>
                <Row>
                <Label for='email' sm={2}>Email</Label>
                <Col sm={10}>
                <FancyInput type='email' name='email'placeholder='Enter your email address'/>
                </Col>
                </Row>
            </FormGroup>
            <FormGroup row>
                <Row>
                <Label for='password' sm={2}>Password</Label>
                <Col sm={10}>
                <FancyInput type='password' name='password' placeholder='Enter a new password'/>
                </Col>
                </Row>
            </FormGroup>
            <FormGroup row>
                <Row>
                <Label for='termsOfService' sm={2}>Read our Terms of Service</Label>
                <Col sm={10}>
                <FancyInput type='checkbox' name='termsOfService' />{' '}
                </Col>
                </Row>
            </FormGroup>
            <Button>Submit</Button>
        </Form>
    )
}
