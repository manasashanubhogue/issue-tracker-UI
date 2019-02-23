import React, { Component } from 'react';
import './App.css';
import Button from 'react-bootstrap/Button'
import { Form, Col,Row, InputGroup, Table } from 'react-bootstrap';
import Loader from 'react-loader-spinner'

class App extends Component {

  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      resultData: null,
      showLoader: false
    };
    
  }

  renderUserInfo() {
    return <table>
          <thead>
            <tr>
                <th>Number of open issues that were opened in the last 24 hours</th>
                <th>Number of open issues that were opened more than 24 hours ago but less than 7 days ago</th>
                <th>Number of open issues that were opened more than 7 days ago </th>
            </tr>
          </thead>
          <tbody>
          {this.state.resultData.map((data, key) => {
            return ( 
            <tr key={key}>
              <td>{data.issues_in_last_24_hrs}</td>
              <td>{data.issues_between_1dayto_7day}</td>
              <td>{data.issues_more_than_7days}</td>
            </tr>
            )
          })}
          </tbody>
        </table>
     } 

  handleSubmit(event) {
    event.preventDefault();
    this.setState({showLoader:true})
    this.setState({resultData:null})
    fetch(`https://github-issue-track.herokuapp.com/api/get-open-issue/?url=${this.input.value}`, {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
      }
    }).then(res => res.json())
    .then(resultData => this.setState({ resultData, showLoader:false })).catch(rejected => {
        console.log(rejected);
    })
  }
  
  render() {
    return (
        <div className="App">
          <header >
            <link
              rel="stylesheet"
              href="https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
              integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS"
              crossorigin="anonymous"
            />
          </header>
          
          <div className="App-header">
            <Form className="form" onSubmit={this.handleSubmit}>
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
          <div className="Response-header">
          
          {this.state.showLoader ? <InputGroup> Waiting for response <Loader 
                    type="ThreeDots"
                    color="white"
                    height="40"	
                    width="40"
                  /> </InputGroup> :<InputGroup> </InputGroup>}
          </div>
          <div className="App-header">
          {this.state.resultData ? 
            ("message" in this.state.resultData ? 
              <InputGroup className="Response-alignment"> {this.state.resultData['message']}</InputGroup> :
                (<Table striped bordered hover>
                  <thead>
                    <tr>
                        <th>Number of open issues that were opened in the last 24 hours</th>
                        <th>Number of open issues that were opened more than 24 hours ago but less than 7 days ago</th>
                        <th>Number of open issues that were opened more than 7 days ago </th>
                        <th>Total issues</th>
                    </tr>
                  </thead>
                  <tbody>
                      <tr>
                        <td>{this.state.resultData['issues_in_last_24_hrs']}</td>
                        <td>{this.state.resultData['issues_between_1dayto_7day']}</td>
                        <td>{this.state.resultData['issues_more_than_7days']}</td>
                        <td>{this.state.resultData['open_issues']}</td>
                      </tr>
                    </tbody> 
                </Table>)
              ) : <InputGroup> </InputGroup>}
          </div>
         </div>

        
          
    );
  }
}

export default App;
