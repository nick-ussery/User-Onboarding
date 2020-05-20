import React from 'react';
// import {Link} from 'react-router-dom';
import {Card, CardBody, CardText, CardTitle, Col} from 'reactstrap';

export default function UserCard(props){
    // console.log('props given to memberCard', props);
   const {name, email,password} = props;
    
    return(
        <Col>
        <Card style={{border: '1px solid black',
                    textAlign: 'center',
                    width: '200px'
                    }}>
            <CardTitle style={{fontSize: '24px'}}>{name}</CardTitle>
            <CardText>Email: {email}</CardText>
            <CardBody>Password: {password}</CardBody>
            {/* <button name={id} onClick={onEdit}>EDIT</button> */}
        </Card>
        </Col>
    )
}