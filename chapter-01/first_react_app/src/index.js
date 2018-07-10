import React from 'react';
import ReactDOM from 'react-dom';
import ClickCounter from './ClickCounter';
import {Component} from 'react';
import './index.css';

class TwoClickCounter extends Component {

  constructor(props) {
    super(props);
    this.onCounterIncreamentMsg = this.onCounterIncreamentMsg.bind(this);
    this.state = {
      summary: 0
    }
  }

  onCounterIncreamentMsg() {
    this.setState({summary: this.state.summary + 1})
  }


  render() {
    return (
    <div> 
      <ClickCounter onChange={this.onCounterIncreamentMsg}/>,
      <ClickCounter onChange={this.onCounterIncreamentMsg}/>,
      <div>
        Summary Count: <span>{this.state.summary}</span>
      </div>
    </div>);
  }
}

ReactDOM.render(
  <TwoClickCounter/>,
  document.getElementById('root')
);
