import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Button from 'react-bootstrap/Button'
import { Form, Col,Row,  ButtonGroup } from 'react-bootstrap';

class App extends Component {

  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch(`http://127.0.0.1:8000/api/get-open-issue/?url=${this.input.value}`, {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "text/plain"
    }
    }).then(response=> console.log(response))
    // console.log()
  }
  
  render() {
    return (
        <div >
          <header >
            <link
              rel="stylesheet"
              href="https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
              integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS"
              crossorigin="anonymous"
            />
          </header>
          
          <div className="App-header">
          <Form onSubmit={this.handleSubmit}>
          <Form.Group as={Row} controlId="formPlaintextPassword">
            <Form.Label row sm="2">
              Enter Github Public Repo URL: 
            </Form.Label>
            <Col sm="10">
              <Form.Control type="text" ref={(input) => this.input = input} placeholder="https://github.com/<Author>/<Repo>" />
            </Col>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
          </Form>
          </div>

        </div>
        
          
    );
  }
}

export default App;
