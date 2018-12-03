import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText , Row, Col} from 'reactstrap';
import '../styling/App.css';
import { Link, Router, Route } from "react-router-dom";
import Map from './Map';
import MapPage from './MapPage'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
            state: '',
            city: '',
            arrivalDate: '',
            returnDate: '',
            numberOfBeds: '',
            maxPrice: '',
            display: false
    }
  }
  render() {
          let mapDisplay
          if (this.state.display) {
                  mapDisplay = <div className="mapPage"><MapPage/></div>
          } else {
                  mapDisplay = "Results Appear Here"
          }
    return (
            <div className="background">
      <div className="wrapper">
        <div className="title">safebnb</div>
        <Form>
        <FormGroup>
          <Label for="exampleEmail">Which state would you like to go to?</Label>
          <Input type="text" name="stateField" id="stateField" placeholder="ex: Massachusetts"
          onChange={e => {
                this.setState({ state: e.target.value })
              }} />
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">Which city would you like to go to?</Label>
          <Input type="text" name="cityField" id="cityField" placeholder="ex: Boston"
          onChange={e => {
                this.setState({ city: e.target.value })
              }}/>
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">What date would you like to arrive?</Label>
          <Input type="text" name="arrivalField" id="arrivalField" placeholder="ex: 11-08-2018"
          onChange={e => {
                this.setState({ arrivalDate: e.target.value })
              }}/>
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">What date would you like to depart?</Label>
          <Input type="text" name="departField" id="departField" placeholder="ex: 11-21-2018"
          onChange={e => {
                this.setState({ returnDate: e.target.value })
              }}/>
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">How many beds do you need?</Label>
          <Input type="text" name="bedField" id="bedField" placeholder="ex: 3"
          onChange={e => {
                this.setState({ numberOfBeds: e.target.value })
              }}/>
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">Maximum Price?</Label>
          <Input type="text" name="priceField" id="bedField" placeholder="ex: 200"
          onChange={e => {
                this.setState({ maxPrice: e.target.value })
              }}/>
        </FormGroup>
      </Form>
      <br></br>


      <Button color="primary" onClick={() => this.setState({display: true})}>
      Submit!
      </Button>

      <br></br>

      </div>

      {mapDisplay}
      </div>
    );
  }
}

export default App;
