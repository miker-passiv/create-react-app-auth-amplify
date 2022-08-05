import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';
Amplify.configure(aws_exports);

class App extends Component {
  render() {
    return (
      <div className="App">
        <AmplifySignOut />
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
              Guardians of the Galaxy
          </p>
          <a  className="App-link" href="https://5bd5x3swz7ch4uxvln2bqscwze0gltjb.lambda-url.eu-west-2.on.aws/"> Yay!</a>
        </header>
      </div>
    );
  }
}

export default withAuthenticator(App);
