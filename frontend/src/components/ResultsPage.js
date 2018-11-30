import React, { Component } from 'react';
import ReactTable from "react-table";
import { Button, Form, FormGroup, Label, Input, FormText , Row, Col} from 'reactstrap';
//import '../styling/App.css';

class ResultsPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }



  render() {
    return (
        <ReactTable
        columns = {[{
              Header: 'Name',
              accessor: 'name' // String-based value accessors!
      }, {  Header: 'Age',
              accessor: 'age',
              Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
      }, {
              id: 'friendName', // Required because our accessor is not a string
              Header: 'Friend Name',
              accessor: d => d.friend.name // Custom value accessors!
      }, {
              Header: props => <span>Friend Age</span>, // Custom header components!
              accessor: 'friend.age'

      }]}
        />

)
  }
}

export default ResultsPage
