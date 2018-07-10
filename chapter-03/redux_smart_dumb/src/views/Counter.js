import React, { Component, PropTypes } from 'react';

import store from '../Store.js';
import * as Actions from '../Actions.js';

const buttonStyle = {
  margin: '10px'
};

class Counter extends Component {
  render() {
    const {caption, onIncrement, onDecrement, value, isMax} = this.props;
    let divStyle = {
      backgroundColor: isMax == "true" ? "lightblue" : "white"
    }  
    return (
      <div style={divStyle}>
        <button style={buttonStyle} onClick={onIncrement}>+</button>
        <button style={buttonStyle} onClick={onDecrement}>-</button>
        <span>{caption} count: {value}</span>
        <span> Max:{isMax}</span>
      </div>
    );
  }
}

Counter.propTypes = {
  caption: PropTypes.string.isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
  isMax: PropTypes.number.isRequired
};


class CounterContainer extends Component {
  constructor(props) {
    super(props);

    this.onIncrement = this.onIncrement.bind(this);
    this.onDecrement = this.onDecrement.bind(this);
    this.onChange = this.onChange.bind(this);
    this.getOwnState = this.getOwnState.bind(this);

    this.state = this.getOwnState();
  }

  getOwnState() {
    let max = undefined;
    let state = store.getState()
    for (const key in state) {
      if (max === undefined) {
        max = state[key];
        continue;
      } 
      if (state[key] > max) {
        max = state[key]
      }
    }
    return {
      value: store.getState()[this.props.caption],
      isMax: (store.getState()[this.props.caption] === max) ? "true" : "false"
    };
  }

  onIncrement() {
    store.dispatch(Actions.increment(this.props.caption));
  }

  onDecrement() {
    store.dispatch(Actions.decrement(this.props.caption));
  }

  onChange() {
    this.setState(this.getOwnState());
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (nextProps.caption !== this.props.caption) ||
      (nextState.value !== this.state.value) ||
      (nextState.isMax !== this.state.isMax);
  }

  componentDidMount() {
    store.subscribe(this.onChange);
  }

  componentWillUnmount() {
    store.unsubscribe(this.onChange);
  }

  render() {
    return <Counter caption={this.props.caption}
      onIncrement={this.onIncrement}
      onDecrement={this.onDecrement}
      value={this.state.value}
      isMax={this.state.isMax} />
  }
}

CounterContainer.propTypes = {
  caption: PropTypes.string.isRequired
};

export default CounterContainer;

