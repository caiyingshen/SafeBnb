import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText , Row, Col} from 'reactstrap';
import '../styling/App.css';
import { Link, Router, Route } from "react-router-dom";

const AppRouter = () => (
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route path="/map" component={Map} />
    </div>
  </Router>
);


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
            minNumReviews: '',
            newListing: '',
            minRating: '',
            superhost: '',
            minBathrooms: ''
    }
  }
  render() {
    return (
      <div className = "App">
        <div className="title">SafeBnb</div>
        <Form>
        <Row form>
        <Col md={6}>
        <FormGroup>
          <Label for="exampleEmail">Which state would you like to go to?</Label>
          <Input type="text" name="stateField" id="stateField" placeholder="ex: Massachusetts"
          onChange={e => {
                this.setState({ state: e.target.value })
              }} />
        </FormGroup>
        </Col>
        <Col md={6}>
        <FormGroup>
          <Label for="exampleEmail">Which city would you like to go to?</Label>
          <Input type="text" name="cityField" id="cityField" placeholder="ex: Boston"
          onChange={e => {
                this.setState({ city: e.target.value })
              }}/>
        </FormGroup>
        </Col>
        </Row>
        <Row form>
        <Col md={6}>
        <FormGroup>
          <Label for="exampleEmail">What date would you like to arrive?</Label>
          <Input type="text" name="arrivalField" id="arrivalField" placeholder="ex: 11-08-2018"
          onChange={e => {
                this.setState({ arrivalDate: e.target.value })
              }}/>
        </FormGroup>
        </Col>
        <Col md={6}>
        <FormGroup>
          <Label for="exampleEmail">What date would you like to depart?</Label>
          <Input type="text" name="departField" id="departField" placeholder="ex: 11-21-2018"
          onChange={e => {
                this.setState({ returnDate: e.target.value })
              }}/>
        </FormGroup>
        </Col>
        <Col md={6}>
        <FormGroup>
          <Label for="exampleEmail">How many beds do you need?</Label>
          <Input type="text" name="bedField" id="bedField" placeholder="ex: 3"
          onChange={e => {
                this.setState({ numberOfBeds: e.target.value })
              }}/>
        </FormGroup>
        </Col>
        </Row>
      </Form>
      <br></br>
      <h>What are your preferences?</h>
      <Row form>
      <Col md={6}>
      <FormGroup>
        <Label for="exampleEmail">Maximum Nightly Rate:</Label>
        <Input type="text" name="priceField" id="priceField" placeholder="ex: 200"
        onChange={e => {
                this.setState({ maxPrice: e.target.value })
              }}/>
      </FormGroup>
      </Col>
      <Col md={6}>
      <FormGroup>
        <Label for="exampleEmail">Minimum Number of Reviews:</Label>
        <Input type="text" name="reviewField" id="reviewField" placeholder="ex: 50"
        onChange={e => {
                this.setState({ minNumReviews: e.target.value })
              }}/>
      </FormGroup>
      </Col>
      </Row>
      <Row form>
      <Col md={6}>
      <FormGroup>
        <Label for="exampleEmail">New listing?:</Label>
        <Input type="text" name="listingField" id="listingField" placeholder="ex: Yes"
        onChange={e => {
                this.setState({ newListing: e.target.value })
              }} />
      </FormGroup>
      </Col>
      <Col md={6}>
      <FormGroup>
        <Label for="exampleEmail">Minimum rating:</Label>
        <Input type="text" name="ratingField" id="ratingField" placeholder="ex: 2.5"
        onChange={e => {
                this.setState({ minRating: e.target.value })
              }}/>
      </FormGroup>
      </Col>
      </Row>
      <Row form>
      <Col md={6}>
      <FormGroup>
        <Label for="exampleEmail">Superhost?:</Label>
        <Input type="text" name="hostField" id="hostField" placeholder="ex: Yes"
        onChange={e => {
                this.setState({ superhost: e.target.value })
              }} />
      </FormGroup>
      </Col>
      <Col md={6}>
      <FormGroup>
        <Label for="exampleEmail">Minimum Number of Bathrooms:</Label>
        <Input type="text" name="bathroomField" id="bathroomField" placeholder="ex: 1.5"
        onChange={e => {
                this.setState({ minBathrooms: e.target.value })
              }} />
      </FormGroup>
      </Col>
      </Row>

      <Link to={{ pathname: './map' }}>
            <Button>Submit!</Button>
         </Link>

      </div>
    );
  }
}

export default App;
