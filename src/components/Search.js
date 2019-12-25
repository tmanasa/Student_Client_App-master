import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, ButtonGroup, Container, Form, FormGroup, Input, Label,Table } from 'reactstrap';

class Search extends Component {
	
	 constructor(props) {
    super(props);
    this.state = {students: [], isLoading: true};
   
  }
	
	  async handleSubmit(event) {
		  
		  this.setState({isLoading: true});

    fetch('/students')
      .then(response => response.json())
      .then(data => this.setState({students: data, isLoading: false}));
		  
	  }
  render() {
	  
	  const {students, isLoading} = this.state;

  
	   const studentList = students.map(student => {
     
      return <tr key={student.id}>
        <td>{student.firstName}</td>
        <td>{student.lastName}</td>
        <td>
          <ButtonGroup>
            <Button size="sm" color="primary" tag={Link} to={"/students/" + student.id}>Edit</Button>
           
          </ButtonGroup>
        </td>
      </tr>
    });
	
	
    return (
      <div>
      
        <Container>
       
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="firstName">First Name</Label>
            <Input type="text" name="firstName" id="firstName" />
          </FormGroup>
		   <FormGroup>
            <Label for="lastName">Last Name</Label>
            <Input type="text" name="lastName" id="lastName" />
          </FormGroup>
		   <FormGroup>
            <Button color="primary" type="submit">Search</Button>
          </FormGroup>
		  </Form>
		  
		   <Table className="mt-4">
            <thead>
            <tr>
              <th width="20%">First Name</th>
              <th width="20%">Last Name</th>
             <th width="10%">Actions</th>
            </tr>
            </thead>
            <tbody>
            {studentList}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default Search;