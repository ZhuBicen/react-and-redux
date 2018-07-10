import React, { Component, PropTypes } from 'react';

import store from '../Store.js';

class Summary extends Component {
  render() {
    return (
      <div>
      <div>Total Count: {this.props.sum}</div>
      <div>Average Count:{this.props.average}</div>
      </div>)
  }
}

Summary.propTypes = {
  sum: PropTypes.number.isRequired,
  average: PropTypes.number.isRequired
};


class SummaryContainer extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);

    this.state = this.getOwnState();
  }

  onChange() {
    this.setState(this.getOwnState());
  }

  getOwnState() {
    const state = store.getState();
    let sum = 0;
    let i = 0;
    for (const key in state) {
      if (state.hasOwnProperty(key)) {
        i++;
        sum += state[key];
      }
    }

    return { sum: sum, average: sum / i };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.sum !== this.state.sum || nextState.average !== this.state.average;
  }

  componentDidMount() {
    store.subscribe(this.onChange);
  }

  componentWillUnmount() {
    store.unsubscribe(this.onChange);
  }

  render() {
    return (
      <Summary sum={this.state.sum} average={this.state.average}></Summary>
    );
  }
}

export default SummaryContainer;
