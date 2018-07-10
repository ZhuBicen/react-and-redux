import * as ActionTypes from './ActionTypes.js';

export default (state, action) => {
  const {counterCaption} = action;

  switch (action.type) {
    case ActionTypes.INCREMENT:
      return {...state, [counterCaption]: state[counterCaption] + 1};
    case ActionTypes.DECREMENT:
      return {...state, [counterCaption]: state[counterCaption] - 1};
    case ActionTypes.DOUBLE:
      console.log("Reducer double action received")
      return {...state, [counterCaption]: state[counterCaption] * 2};
    default:
      return state
  }
}
