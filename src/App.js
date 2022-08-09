import Dygraph from 'dygraphs';
import 'dygraphs/dist/dygraph.min.css'
import ReactDOM from 'react-dom';
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
	    <DevicesList />

        </header>
      </div>
    );
  }
  componentDidMount() {
      let timer=setInterval(getData(),10000);
  }
}

function DevicesList(props) {
    return (
	    <div className="App-table">
	    <h3> Guardians of the Galaxy </h3>
	    <DeviceRows/>
   	    </div>
    );
}

function Spinner(props) {
    return (
            <div className="border-fix">
            <img src={logo} className="App-logo-small" alt="logo" />
            <span> {props.text}</span>
            </div>

    );
}

function DeviceDetails(props) {
    return (
            <div>
            <img src={logo} className="App-logo-small" alt="logo" />
            <span> {props.text}</span>
            </div>

    );
}

function DeviceData(props) {
    return (<div>
	    <div>{"Detected Device:"+props.data.device_id.toString()}</div>
	    <Spinner text={"Status: Operational ..."}/>

	    <DyGraph url={props.data.device_events}/>
	    <a className="App-link" href={props.data.device_events}>Data Stream Download!</a>
	    </div>


    );
}

function DeviceRows(props) {
    return (<div>
	    <hr/>
	    <div className="App-table-row" id="device_table">
	    <DeviceDetails text="Detecting devices..."/>
	    </div>

            <hr/>
	    </div>
    );
}





class DyGraph extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div id="graph"></div>;
  }

  componentDidMount() {
      const g = new Dygraph('graph', this.props.url
/*
   `
    '2016/01/01',10,20
    '2016/07/01',20,10
    '2016/12/31',40,30
    '2017/07/01',20,10
    '2017/12/31',40,30
    `
*/
			    , {
        title: 'Environmental Trends',
        titleHeight: 32,
        ylabel: 'Absolute Valeus',
        xlabel: 'Time',
        gridLineWidth: '0.1',
        width: 700,
        height: 300,
        connectSeparatedPoints: true,
	strokeWidth: 3,
        highlightCircleSize: 7,
        axes: { "x": { "axisLabelFontSize": 9 }, "y": { "axisLabelFontSize": 9 } },
        labels: ['Date', 'Photon Accumulation','Average Kinetic Energy'],

          colors: ["rgb(51,204,204)",
                   "rgb(255,100,100)",
		  ]     
    }        );

      const interval = setInterval(() => {
	  g.updateOptions( {'file': this.props.url} )
      }, 1000);
  }
}










export default withAuthenticator(App);

function getData(){
    
    let url = 'https://5bd5x3swz7ch4uxvln2bqscwze0gltjb.lambda-url.eu-west-2.on.aws/'


    fetch(url)
	.then(res => res.json())
	.then(rows => {
	    ReactDOM.render(<DeviceData data={rows} />, document.getElementById('device_table'));
	})
}



