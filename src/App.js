import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  componentDidMount() {
    // this is an "echo" websocket service
  	var connection = new WebSocket('ws://localhost:3001/ws');
    // listen to onmessage event
    ///this.connection.onmessage = evt => { 
      // add the new message to state
    	//this.setState({
      	//messages : this.state.messages.concat([ evt.data ])
    connection.onopen = function () {
        var emp = {
            Name:"batman",
            Scheme:"scheme 1"
        }
        var msg = {
            Acctype:"ir",
            Action:"enrollemp",
            Data:JSON.stringify(emp)
       }
       console.log(msg)
       connection.send(JSON.stringify(msg))
    }
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;