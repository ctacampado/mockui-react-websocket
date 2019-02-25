import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.payload = {};
    this.socket = new WebSocket('ws://localhost:8080/ra');
    this.emit = this.emit.bind(this);
  }

  emit() {
    if(this.payload.Payload.EnrollmentApproval) {
      console.log("received enrollmentApproval!");
      var msg = {
        Username:"approver",
        Type:"RA",
        OrgCode: "RA"
      }
      this.payload.Payload.EnrollmentApproval.Approvals.RAApproval.Status = "approved";
      this.payload.Payload.EnrollmentApproval.Approvals.RAApproval.Date = new Date();
      msg.Payload = this.payload.Payload;
      console.log("sending: " + JSON.stringify(msg));
      this.socket.send(JSON.stringify(msg));
    }
  }

  componentDidMount() {
    this.socket.onopen = () => {
      var empData = {
        ID:         "52RFV5TGB6YHN",
        FirstName:  "Yujin",
        MiddleName: "",
        LastName:   "Ahn",
        Birthday:   "01/09/2003",
        Age:        "15",
        Address:    "577-92 Banpo sa-dong, Seocho-gu, Seoul, South Korea",
        Email:      "yujin.ahn@starshipent.kr",
        ContactNo:  "",
        TaxID:      "8765432109",
        Employer:   "Starship Entertainment",
      }
      var fpinfo = {
        FPName: "Fund Provider A",
        FPCode: "FPA",
        FPProgram: "A",
        CurrInvstAmt: "300000.00",
        Currency: "USD"
      }
      var payload = {
        EnrollmentReq: {
          EmployeeData: empData,
          FPInfo: fpinfo
        }
      }
      var msg = {
        Username:"employee",
        Type:"RA",
        OrgCode: "RA",
        Payload: payload
      }
      console.log(msg)
      this.socket.send(JSON.stringify(msg))
    }
    
    this.socket.onmessage = (event) => {
      console.log(event.data);
      this.payload = JSON.parse(event.data);
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
        <button onClick={this.emit}/>
      </div>
    );
  }
}

export default App;
