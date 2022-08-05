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
	    <Devices />
        </header>
      </div>
    );
  }
}

class Devices extends Component{
  render() {
    return (
	    <div className="App-table">
	    <h3> Guardians of the Galaxy </h3>
	    <DeviceRows/>
	    <div>
	    <a className="App-link" href="https://5bd5x3swz7ch4uxvln2bqscwze0gltjb.lambda-url.eu-west-2.on.aws/"> Download your data!</a>
	    </div>

	</div>
    );
  }  	    
}

class Spinner extends Component{
  render() {
    return (
	    <div>
            <img src={logo} className="App-logo-small" alt="logo" />
	    <span> {this.props.text}</span>
            </div>

    );
  }
}

class DeviceRows extends Component {
  render() {
    return (<div>
	                <hr/>
	    <div className="App-table-row">

	    <Spinner text="Detecting devices..."/>
	    </div>

            <hr/>
	    </div>
    );
  }
}
export default withAuthenticator(App);
