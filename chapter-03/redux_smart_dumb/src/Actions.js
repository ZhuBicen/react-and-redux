import * as ActionTypes from './ActionTypes.js';

export const increment = (counterCaption) => {
  return {
    type: ActionTypes.INCREMENT,
    counterCaption: counterCaption
  };
};

export const decrement = (counterCaption) => {
  return {
    type: ActionTypes.DECREMENT,
    counterCaption: counterCaption
  };
};


export const double = (couterCaption) => {
  return {
    type:ActionTypes.DOUBLE,
    couterCaption:couterCaption
  }
}